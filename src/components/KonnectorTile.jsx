import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import classNames from 'classnames'

import Icon from 'cozy-ui/react/Icon'
import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
import { getErrorTitle } from '../lib/konnectors'
import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from '../ducks/connections'
import { getKonnectorTriggersCount } from '../reducers'

import brokenIcon from '../assets/icons/broken.svg'

const getKonnectorError = ({ error, t }) => {
  return error
    ? getErrorTitle(t, error, key => `connection.error.${key}.title`)
    : null
}

const getErrorClass = ({ accountsCount, error, userError }) => {
  // userError must be checked first as it is also an error.
  if (userError) {
    return 'konnector-error konnector-error--connection'
  }

  if (error) {
    return 'konnector-error konnector-error--blocked'
  }

  if (!accountsCount) {
    return 'konnector-error konnector-error--no-accounts'
  }

  return null
}

const KonnectorTile = ({
  accountsCount,
  error,
  userError,
  konnector,
  lastSyncDate,
  route,
  t
}) => {
  return (
    <NavLink
      className="item-wrapper"
      to={route}
      title={getKonnectorError({ error, t })}
    >
      <div
        className={classNames(
          'item-icon',
          getErrorClass({ accountsCount, error, userError })
        )}
      >
        <img
          alt={t('connector.logo.alt', { name: konnector.name })}
          src={getKonnectorIcon(konnector)}
        />
        <Icon icon={brokenIcon} className="konnector-state" />
      </div>
      <h3 className="item-title">{konnector.name}</h3>
    </NavLink>
  )
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

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
