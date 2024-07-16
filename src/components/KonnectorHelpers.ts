import {
  IOCozyAccount,
  IOCozyTrigger,
  IOCozyKonnector
} from 'cozy-client/types/types'

export const STATUS = {
  OK: 0,
  MAINTENANCE: 2,
  ERROR: 3,
  NO_ACCOUNT: 4,
  LOADING: 5
} as const

/**
 * Get accounts from triggers
 * @param {Record<string, IOCozyAccount>} accounts
 * @param {IOCozyTrigger[]} triggers
 * @returns {IOCozyAccount[]}
 */
export const getAccountsFromTrigger = (
  accounts: Record<string, IOCozyAccount>,
  triggers: IOCozyTrigger[]
): IOCozyAccount[] => {
  const triggerAccountIds = triggers.map(trigger => trigger.message.account)
  const matchingAccounts = Object.values(accounts).filter(account =>
    triggerAccountIds.includes(account._id)
  )
  return matchingAccounts
}

/**
 * Get triggers by slug
 * @param {Record<string, IOCozyTrigger>} triggers
 * @param {IOCozyKonnector['slug']} slug
 * @returns {IOCozyTrigger[]}
 */
export function getTriggersBySlug(
  triggers: Record<string, IOCozyTrigger>,
  slug: IOCozyKonnector['slug']
): IOCozyTrigger[] {
  return Object.values(triggers).filter(trigger => {
    return (
      trigger.message &&
      trigger.message.konnector &&
      trigger.message.konnector === slug
    )
  })
}
