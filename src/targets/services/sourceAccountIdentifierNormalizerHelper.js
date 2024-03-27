import logger from 'cozy-logger'
import { Q, models } from 'cozy-client'

const log = logger.namespace('sourceAccountIdentifierNormalizer')

async function createBillsAndFilesAccountsMap({
  client,
  bills,
  billsFilesMap
}) {
  const billsAndFilesAccountIds = [
    ...bills.map(bill => bill?.cozyMetadata?.sourceAccount).filter(Boolean),
    ...Array.from(billsFilesMap.values())
      .map(file => file?.cozyMetadata?.sourceAccount)
      .filter(Boolean)
  ]
  const billsAndFilesAccounts = await client.queryAll(
    Q('io.cozy.accounts').getByIds(billsAndFilesAccountIds)
  )
  return billsAndFilesAccounts.reduce((map, account) => {
    map.set(account._id, account)
    return map
  }, new Map())
}

export async function normalizeIdentities(client) {
  const identities = await client.queryAll(
    Q('io.cozy.identities').partialIndex({
      'cozyMetadata.sourceAccountIdentifier': { $exists: false },
      identifier: { $exists: true }
    })
  )

  const normalizedIdentities = identities
    .map(identity => ({
      ...identity,
      cozyMetadata: {
        ...identity.cozyMetadata,
        sourceAccountIdentifier: identity.identifier
      }
    }))
    .filter(Boolean)

  if (normalizedIdentities.length > 0) {
    await client.saveAll(normalizedIdentities)
  }
  log('info', `Normalized ${normalizedIdentities.length}/${identities.length}`)
}

export async function normalizeBills(client) {
  const bills = await client.queryAll(
    Q('io.cozy.bills').partialIndex({
      'cozyMetadata.sourceAccountIdentifier': { $exists: false }
    })
  )

  const billsFilesMap = await createBillsFilesMap({ client, bills })
  const billsAndFilesAccountsMap = await createBillsAndFilesAccountsMap({
    client,
    bills,
    billsFilesMap
  })

  const normalizedBills = bills
    .map(bill => {
      let sourceAccountIdentifier = null
      if (bill.sourceAccountIdentifier) {
        sourceAccountIdentifier = bill.sourceAccountIdentifier
      } else if (bill.cozyMetadata?.sourceAccount) {
        const account = billsAndFilesAccountsMap.get(
          bill.cozyMetadata.sourceAccount
        )
        if (account) {
          if (account.cozyMetadata?.sourceAccountIdentifier) {
            sourceAccountIdentifier =
              account.cozyMetadata.sourceAccountIdentifier
          } else {
            const accountName = models.account.getAccountName(account)
            sourceAccountIdentifier =
              accountName !== account._id ? accountName : null
          }
        }
      } else if (!sourceAccountIdentifier && bill.invoice) {
        const fileId = bill.invoice?.split(':').pop()
        const file = billsFilesMap.get(fileId)
        const fileCozyMetadata = file?.cozyMetadata
        if (fileCozyMetadata?.sourceAccountIdentifier) {
          sourceAccountIdentifier = file.cozyMetadata.sourceAccountIdentifier
        } else if (fileCozyMetadata?.sourceAccount) {
          const account = billsAndFilesAccountsMap.get(
            file.cozyMetadata.sourceAccount
          )
          if (account) {
            if (account.cozyMetadata?.sourceAccountIdentifier) {
              sourceAccountIdentifier =
                account.cozyMetadata.sourceAccountIdentifier
            } else {
              const accountName = models.account.getAccountName(account)
              sourceAccountIdentifier =
                accountName !== account._id ? accountName : null
            }
          }
        }
      }
      if (!sourceAccountIdentifier) {
        return false
      }
      return {
        ...bill,
        cozyMetadata: { ...bill.cozyMetadata, sourceAccountIdentifier }
      }
    })
    .filter(Boolean)

  log('info', `Normalized ${normalizedBills.length}/${bills.length}`)
  if (normalizedBills.length > 0) {
    await client.saveAll(normalizedBills)
  }
}

export async function normalizeAccounts(client) {
  const accounts = await client.queryAll(
    Q('io.cozy.accounts').partialIndex({
      'cozyMetadata.sourceAccountIdentifier': { $exists: false }
    })
  )

  const normalizedAccounts = accounts
    .map(account => {
      const accountName = models.account.getAccountName(account)
      const sourceAccountIdentifier =
        accountName !== account._id ? accountName : null
      if (!sourceAccountIdentifier) {
        return false
      }

      return {
        ...account,
        cozyMetadata: { ...account.cozyMetadata, sourceAccountIdentifier }
      }
    })
    .filter(Boolean)

  log('info', `Normalized ${normalizedAccounts.length}/${accounts.length}`)
  if (normalizedAccounts.length > 0) {
    await client.saveAll(normalizedAccounts)
  }
}

async function createBillsFilesMap({ client, bills }) {
  const billsInvoicesIds = bills.map(bill => {
    return bill.invoice?.split(':').pop()
  })
  const files = await client.queryAll(
    Q('io.cozy.files').getByIds(billsInvoicesIds)
  )
  return files.reduce((map, file) => {
    map.set(file._id, file)
    return map
  }, new Map())
}
