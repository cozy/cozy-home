const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'
const PERMISSIONS_DOCTYPE = 'io.cozy.permissions'

export const accountsMutations = client => {
  const createAccount = async attributes => {
    const { data } = await client.create(ACCOUNTS_DOCTYPE, attributes)
    return data
  }

  const findParentAccount = async id => {
    const { data } = await client.query(
      client.find(ACCOUNTS_DOCTYPE).where({ _id: id })
    )
    return data[0]
  }

  const createParentAccount = id => {
    return createAccount({
      _id: id
    })
  }

  const createChildAccount = async (konnector, attributes) => {
    const { aggregator } = konnector

    if (!aggregator || !aggregator.accountId)
      throw new Error('Konnector does not provide aggregator account id')

    const parentAccountId = aggregator.accountId

    let parentAccount
    try {
      parentAccount = await findParentAccount(parentAccountId)
    } catch (error) {
      throw new Error(
        `An error occurred when finding parent account ${parentAccountId} (${
          error.message
        })`
      )
    }

    if (!parentAccount) {
      try {
        parentAccount = await createParentAccount(parentAccountId)
      } catch (error) {
        throw new Error(
          `Cannot create parent account ${parentAccountId} (${error.message})`
        )
      }
    }

    try {
      await client.collection(PERMISSIONS_DOCTYPE).add(konnector, {
        aggregatorAccount: {
          type: ACCOUNTS_DOCTYPE,
          verbs: ['GET', 'PUT'],
          values: [`${ACCOUNTS_DOCTYPE}.${parentAccountId}`]
        }
      })
    } catch (error) {
      throw new Error(
        `Cannot set permission for account ${parentAccountId} (${
          error.message
        })`
      )
    }

    return await createAccount({
      ...attributes,
      relationships: {
        parent: {
          data: {
            _id: parentAccountId,
            _type: ACCOUNTS_DOCTYPE
          }
        }
      }
    })
  }

  return {
    createAccount,
    createChildAccount
  }
}

export default accountsMutations
