// @ts-check
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import flag from 'cozy-flags'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

/**
 *
 * @param {object} param
 * @param {string|null|true|Error} param.error Error message
 * @param {string} param.lang Lang (fr/en/es/...)
 * @param {import('cozy-client/types/types').IOCozyKonnector} param.konnector
 * @returns
 */
const getKonnectorError = ({ error, lang, konnector }) => {
  if (!error) {
    return null
  }

  const konnError = new KonnectorJobError(error)
  return getErrorLocaleBound(konnError, konnector, lang, 'title')
}

export const STATUS = {
  OK: 0,
  MAINTENANCE: 2,
  ERROR: 3,
  NO_ACCOUNT: 4,
  LOADING: 5
}

const statusMap = {
  [STATUS.NO_ACCOUNT]: 'ghost',
  [STATUS.MAINTENANCE]: 'maintenance',
  [STATUS.ERROR]: 'error',
  [STATUS.LOADING]: 'loading'
}
/**
 *
 * @param {object} props
 * @param {boolean} props.isInMaintenance Is in maintenance?
 * @param {number} props.accountsCount Number of Accounts
 * @param {boolean} props.error isInError
 * @param {boolean} props.userError user error
 * @param {boolean} props.loading Loading status
 * @returns {number} The status
 */
export const getKonnectorStatus = ({
  isInMaintenance,
  error,
  userError,
  accountsCount,
  loading
}) => {
  if (loading) return STATUS.LOADING
  if (isInMaintenance) return STATUS.MAINTENANCE
  else if (error || userError) return STATUS.ERROR
  else if (!accountsCount) return STATUS.NO_ACCOUNT
  else return STATUS.OK
}

/**
 * @param {object} triggers
 * @param {import('cozy-client/types/types').IOCozyTrigger} triggers.trigger - io.cozy.triggers object
 * @param {import('cozy-client/types/types').IOCozyKonnector['slug']} slug
 * @returns
 */
function getTriggersBySlug(triggers, slug) {
  return Object.values(triggers).filter(trigger => {
    return (
      trigger.message &&
      trigger.message.konnector &&
      trigger.message.konnector === slug
    )
  })
}
/**
 * @param {import('cozy-client/types/types').IOCozyTrigger[]} triggers - io.cozy.triggers object
 * @param {object} jobs
 * @returns {null|true|string}
 */
function getErrorForTriggers(triggers, jobs) {
  const triggersInError = triggers.filter(
    t => t.current_state?.status === 'errored'
  )
  if (triggersInError?.length > 0) {
    const job = Object.values(jobs).find(
      job => job.trigger_id === triggersInError[0]._id
    )
    // we can have triggers without job?
    if (!job) {
      return true
    }
    return job.error
  }
  return null
}
const getAccountsFromTrigger = (accounts, triggers) => {
  const triggerAccountIds = triggers.map(trigger => trigger.message.account)
  const matchingAccounts = Object.values(accounts).filter(account =>
    triggerAccountIds.includes(account.id)
  )
  return matchingAccounts
}

const getFirstUserError = triggers => {
  const triggersInError = Object.values(triggers).filter(
    t => t.current_state?.status === 'errored'
  )
  const firstTriggerHavingUserError = Object.values(triggersInError).find(
    trigger => {
      const e = new KonnectorJobError(trigger.current_state.last_error)
      const isUserError = e.isUserError()
      return isUserError
    }
  )
  return firstTriggerHavingUserError
    ? firstTriggerHavingUserError.current_state.last_error
    : null
}
/**
 *
 * @param {object} props
 * @param {boolean} props.isInMaintenance Is in maintenance
 * @param {boolean} props.loading isLoading ?
 * @param {import('cozy-client/types/types').IOCozyKonnector} props.konnector
 * @returns
 */
export const KonnectorTile = ({ konnector, isInMaintenance, loading }) => {
  const allTriggers =
    useSelector(state => state.cozy.documents['io.cozy.triggers']) || {}
  const triggers = getTriggersBySlug(allTriggers, konnector.slug)
  const userError = getFirstUserError(triggers, konnector.slug)
  const jobs = useSelector(state => state.cozy.documents['io.cozy.jobs']) || {}
  const accounts =
    useSelector(state => state.cozy.documents['io.cozy.accounts']) || {}
  const accountsForKonnector = getAccountsFromTrigger(accounts, triggers)
  const error = getErrorForTriggers(triggers, jobs)
  const hasAtLeastOneError = error !== null

  const { lang } = useI18n()

  const hideKonnectorErrors = flag('home.konnectors.hide-errors') // flag used for some demo instances where we want to ignore all konnector errors

  const status = hideKonnectorErrors
    ? STATUS.OK
    : getKonnectorStatus({
        accountsCount: accountsForKonnector.length,
        error: hasAtLeastOneError,
        isInMaintenance,
        loading,
        userError
      })
  const errorToDisplay =
    userError !== true && userError !== null ? userError : error
  return (
    <NavLink
      to={konnector.slug}
      title={getKonnectorError({
        error: errorToDisplay,
        lang,
        konnector
      })}
      className="scale-hover"
    >
      <SquareAppIcon
        app={konnector}
        type="konnector"
        name={konnector.name}
        variant={statusMap[status]}
      />
    </NavLink>
  )
}

KonnectorTile.propTypes = {
  isInMaintenance: PropTypes.bool,
  konnector: PropTypes.object,
  loading: PropTypes.bool
}

export default /* connect(mapStateToProps)( */ KonnectorTile // )
