require('babel-polyfill')
const cozyFetch = require('../../lib/services/cozyFetch')

const logMessagePrefix = level =>
  `[cozy-collect][cleanOrphanAccounts][${level}]:`

const output = level =>
  function() {
    console.log.apply(
      console,
      [logMessagePrefix(level)].concat(Object.values(arguments))
    )
  }

const log = {
  error: output('error'),
  info: output('info')
}

const fetchAccounts = async () => {
  log.info('Fetching accounts...')

  const accounts = await cozyFetch(
    'GET',
    'data/io.cozy.accounts/_all_docs?include_docs=true',
    null,
    true
  )

  log.info(`${accounts.length || 0} account(s) has been found.`)

  return accounts
}

const fetchTriggers = async () => {
  log.info('Fetching konnector triggers...')

  const result = await cozyFetch(
    'GET',
    'jobs/triggers?Worker=konnector',
    null,
    true
  )

  const hasTriggers = result && result.data && result.data.length
  const triggers = result.data

  if (hasTriggers) {
    log.info(`${triggers.length || 0} konnector trigger(s) has been found.`)

    return triggers
  }

  return []
}

const indexTriggersByAccounts = triggers =>
  triggers.reduce((indexed, trigger) => {
    const account =
      trigger.attributes &&
      trigger.attributes.message &&
      trigger.attributes.message.account

    if (account) {
      indexed[account] = trigger
    }

    return indexed
  }, {})

const deleteAccounts = async accounts => {
  log.info(`Deleting accounts ${accounts.map(doc => doc._id).join(', ')}`)
  await cozyFetch(
    'POST',
    `data/io.cozy.accounts/_bulk_docs`,
    { docs: accounts.map(doc => ({ ...doc, _deleted: true })) },
    true
  )
}

const cleanOrphanAccounts = async () => {
  try {
    const accounts = await fetchAccounts()
    const triggers = await fetchTriggers()

    const triggersIndexedByAccount = indexTriggersByAccounts(triggers)

    const orphanAccounts = accounts.filter(
      account => !triggersIndexedByAccount[account._id]
    )

    log.info(`${orphanAccounts.length || 0} orphan account(s) has been found.`)

    if (orphanAccounts.length) {
      await deleteAccounts(orphanAccounts)
    }
  } catch (error) {
    log.error(error.message)
  }
}

cleanOrphanAccounts()
