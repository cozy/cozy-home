import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/stylus/settings/palette.json'
import WrenchCircleIcon from 'cozy-ui/transpiled/react/Icons/WrenchCircle'
import WarningCircleIcon from 'cozy-ui/transpiled/react/Icons/WarningCircle'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

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

const STATUS = {
  OK: 0,
  UPDATE: 1,
  MAINTENANCE: 2,
  ERROR: 3,
  NO_ACCOUNT: 4
}

const getKonnectorStatus = ({
  konnector,
  isInMaintenance,
  error,
  userError,
  accountsCount
}) => {
  if (konnector.available_version) return STATUS.UPDATE
  else if (isInMaintenance) return STATUS.MAINTENANCE
  else if (error || userError) return STATUS.ERROR
  else if (!accountsCount) return STATUS.NO_ACCOUNT
  else return STATUS.OK
}

const statusThemes = {
  [STATUS.NO_ACCOUNT]: {
    className: 'item--ghost',
    icon: null,
    color: null
  },
  [STATUS.MAINTENANCE]: {
    className: 'item--maintenance',
    icon: WrenchCircleIcon,
    color: palette.coolGrey
  },
  [STATUS.ERROR]: {
    className: null,
    icon: WarningCircleIcon,
    color: palette.pomegranate
  }
}

export const KonnectorTile = props => {
  const { t, lang } = useI18n()
  const {
    accountsCount,
    error,
    isInMaintenance,
    userError,
    konnector,
    route
  } = props

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
  const { className: statusClassName, icon, color } = get(
    statusThemes,
    status,
    {}
  )

  return (
    <NavLink
      className={classNames('item', statusClassName)}
      to={route}
      title={getKonnectorError({ error, lang, konnector })}
    >
      <div className="item-icon">
        <AppIcon
          alt={t('app.logo.alt', { name: konnector.name })}
          app={konnector}
        />
        {icon && <Icon icon={icon} className="item-status" color={color} />}
      </div>
      <h3 className="item-title">{konnector.name}</h3>
    </NavLink>
  )
}

KonnectorTile.propTypes = {
  accountsCount: PropTypes.number,
  error: PropTypes.object,
  isInMaintenance: PropTypes.bool.isRequired,
  userError: PropTypes.object,
  konnector: PropTypes.object,
  route: PropTypes.string.isRequired
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
