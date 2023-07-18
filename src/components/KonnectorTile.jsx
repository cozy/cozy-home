import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import flag from 'cozy-flags'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

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

export const getKonnectorStatus = ({
  isInMaintenance,
  error,
  accountsCount,
  loading
}) => {
  if (loading) return STATUS.LOADING
  if (isInMaintenance) return STATUS.MAINTENANCE
  else if (error) return STATUS.ERROR
  else if (!accountsCount) return STATUS.NO_ACCOUNT
  else return STATUS.OK
}
function getTriggersBySlug(triggers, slug) {
  return Object.values(triggers).filter(trigger => {
    return (
      trigger.message &&
      trigger.message.konnector &&
      trigger.message.konnector === slug
    )
  })
}
function getErrorsForTriggers(triggers, jobs) {
  const triggersInError = triggers.filter(
    t => t.current_state.status === 'errored'
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
export const KonnectorTile = props => {
  const test = useSelector(state => state.cozy.documents['io.cozy.triggers'])
  const triggers = getTriggersBySlug(test, props.konnector.slug)
  const jobs = useSelector(state => state.cozy.documents['io.cozy.jobs'])
  const accounts = useSelector(
    state => state.cozy.documents['io.cozy.accounts']
  )
  const accountsForKonnector = getAccountsFromTrigger(accounts, triggers)
  const error = getErrorsForTriggers(triggers, jobs)
  const hasAtLeastOneError = error !== null

  const { lang } = useI18n()
  const { isInMaintenance, konnector, loading } = props

  const hideKonnectorErrors = flag('home.konnectors.hide-errors') // flag used for some demo instances where we want to ignore all konnector errors

  const status = hideKonnectorErrors
    ? STATUS.OK
    : getKonnectorStatus({
        accountsForKonnector,
        error: hasAtLeastOneError,
        isInMaintenance,
        konnector,
        loading
      })

  return (
    <NavLink
      to={konnector.slug}
      title={getKonnectorError({ error, lang, konnector })}
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
  accountsCount: PropTypes.number,
  error: PropTypes.object,
  isInMaintenance: PropTypes.bool,
  konnector: PropTypes.object,
  userError: PropTypes.object
}

export default /* connect(mapStateToProps)( */ KonnectorTile // )
