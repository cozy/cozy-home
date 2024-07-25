import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import flag from 'cozy-flags'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { generateWebLink, useClient } from 'cozy-client'

import {
  STATUS,
  getAccountsFromTrigger,
  getTriggersBySlug
} from 'components/KonnectorHelpers'

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

/**
 * @typedef {Object} StatusMap
 * @property {string} [STATUS.NO_ACCOUNT] - The status when there is no account, represented as 'ghost'.
 * @property {string} [STATUS.MAINTENANCE] - The status when under maintenance, represented as 'maintenance'.
 * @property {string} [STATUS.ERROR] - The status when there is an error, represented as 'error'.
 * @property {string} [STATUS.LOADING] - The status when loading, represented as 'loading'.
 */

/**
 * A mapping of status constants to their corresponding string representations.
 * @type {StatusMap}
 */
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
 * @param {string?} props.userError user error
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

/**
 *
 * @param {import('cozy-client/types/types').IOCozyTrigger[]} triggers
 * @returns
 */
const getFirstUserError = triggers => {
  const triggersInError = Object.values(triggers).filter(
    t => t.current_state?.status === 'errored'
  )
  const firstTriggerHavingUserError = Object.values(triggersInError).find(
    trigger => {
      const e = new KonnectorJobError(trigger.current_state?.last_error)
      const isUserError = e.isUserError()
      return isUserError
    }
  )
  return firstTriggerHavingUserError?.current_state
    ? firstTriggerHavingUserError.current_state.last_error
    : null
}
/**
 *
 * @param {object} props
 * @param {boolean} props.isInMaintenance Is in maintenance
 * @param {boolean} props.loading isLoading ?
 * @param {import('cozy-client/types/types').IOCozyKonnector} props.konnector
 * @param {boolean} [props.shouldOpenStore=false] The Konnector should open the store when clicked (ie it's a forced suggestion)
 * @returns
 */
export const KonnectorTile = ({
  konnector,
  isInMaintenance,
  loading,
  shouldOpenStore = false
}) => {
  const allTriggers =
    // @ts-ignore
    useSelector(state => state.cozy.documents['io.cozy.triggers']) || {}
  const triggers = getTriggersBySlug(allTriggers, konnector.slug)
  const userError = getFirstUserError(triggers)
  // @ts-ignore
  const jobs = useSelector(state => state.cozy.documents['io.cozy.jobs']) || {}
  const accounts =
    // @ts-ignore
    useSelector(state => state.cozy.documents['io.cozy.accounts']) || {}
  const accountsForKonnector = getAccountsFromTrigger(accounts, triggers)
  const error = getErrorForTriggers(triggers, jobs)
  const hasAtLeastOneError = error !== null
  const client = useClient()
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
  const errorToDisplay = !userError && userError !== null ? userError : error

  // Navigate to the store if the konnector is a suggestion (ie not installed)
  const handleSuggestionClick = event => {
    if (!shouldOpenStore) return // Should not happen but just in case

    event.preventDefault() // Prevent the default behavior of NavLink to avoid navigating to the konnector hash

    const cozyURL = new URL(client.getStackClient().uri)
    const app = 'store'
    const nativePath = `/discover/${konnector.slug}`
    const { subdomain: subDomainType } = client.getInstanceOptions()
    const url = generateWebLink({
      pathname: '/',
      cozyUrl: cozyURL.origin,
      slug: app,
      hash: nativePath,
      subDomainType
    })

    window.open(url, '_blank')
  }

  return (
    <NavLink
      to={`/connected/${konnector.slug}`}
      title={getKonnectorError({
        error: errorToDisplay,
        lang,
        konnector
      })}
      className="scale-hover"
      {...(shouldOpenStore ? { onClick: handleSuggestionClick } : {})}
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
