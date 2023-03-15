import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import flag from 'cozy-flags'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { getKonnectorTriggersCount } from 'reducers'
import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from 'ducks/connections'

const getKonnectorError = ({ error, lang, konnector }) => {
  if (!error || !error.message) {
    return null
  }
  const konnError = new KonnectorJobError(error.message)
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

export const KonnectorTile = props => {
  const { lang } = useI18n()
  const {
    accountsCount,
    error,
    isInMaintenance,
    userError,
    konnector,
    loading
  } = props

  const hideKonnectorErrors = flag('home.konnectors.hide-errors') // flag used for some demo instances where we want to ignore all konnector errors

  const status = hideKonnectorErrors
    ? STATUS.OK
    : getKonnectorStatus({
        accountsCount,
        error,
        isInMaintenance,
        konnector,
        loading,
        userError
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

const mapStateToProps = (state, props) => {
  const { konnector } = props

  return {
    accountsCount: getKonnectorTriggersCount(state, konnector),
    // /!\ error can also be a userError.
    error: getFirstError(state.connections, konnector.slug),
    lastSyncDate: getLastSyncDate(state.connections, konnector.slug),
    userError: getFirstUserError(state.connections, konnector.slug)
  }
}

export default connect(mapStateToProps)(KonnectorTile)
