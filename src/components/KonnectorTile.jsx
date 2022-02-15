import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'

import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from 'ducks/connections'
import { getKonnectorTriggersCount } from 'reducers'

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
  NO_ACCOUNT: 4
}

const statusMap = {
  [STATUS.NO_ACCOUNT]: 'ghost',
  [STATUS.MAINTENANCE]: 'maintenance',
  [STATUS.ERROR]: 'error'
}

export const getKonnectorStatus = ({
  isInMaintenance,
  error,
  userError,
  accountsCount
}) => {
  if (isInMaintenance) return STATUS.MAINTENANCE
  else if (error || userError) return STATUS.ERROR
  else if (!accountsCount) return STATUS.NO_ACCOUNT
  else return STATUS.OK
}

export const KonnectorTile = props => {
  const { lang } = useI18n()
  const { accountsCount, error, isInMaintenance, userError, konnector, route } =
    props

  const hideKonnectorErrors = flag('home.konnectors.hide-errors') // flag used for some demo instances where we want to ignore all konnector errors

  const status = hideKonnectorErrors
    ? STATUS.OK
    : getKonnectorStatus({
        konnector,
        isInMaintenance,
        error,
        userError,
        accountsCount
      })

  return (
    <NavLink
      to={route}
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
  userError: PropTypes.object,
  konnector: PropTypes.object
}

const mapStateToProps = (state, props) => {
  const { konnector } = props
  return {
    // /!\ error can also be a userError.
    error: getFirstError(state.connections, konnector.slug),
    userError: getFirstUserError(state.connections, konnector.slug),
    lastSyncDate: getLastSyncDate(state.connections, konnector.slug),
    accountsCount: getKonnectorTriggersCount(state, konnector)
  }
}

export default connect(mapStateToProps)(withRouter(KonnectorTile))
