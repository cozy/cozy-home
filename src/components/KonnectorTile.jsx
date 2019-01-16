import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import classNames from 'classnames'

import AppIcon from 'cozy-ui/react/AppIcon'
import Icon from 'cozy-ui/react/Icon'
import { NavLink, withRouter } from 'react-router-dom'

import { getErrorTitle } from '../lib/konnectors'
import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from '../ducks/connections'
import { getKonnectorTriggersCount } from '../reducers'
import { isInMaintenance } from '../ducks/konnectors'

import brokenIcon from '../assets/icons/broken.svg'

const getKonnectorError = ({ error, t }) => {
  return error
    ? getErrorTitle(t, error, key => `connection.error.${key}.title`)
    : null
}

const getErrorClass = ({
  accountsCount,
  error,
  hide,
  hasUpdate,
  inMaintenance,
  userError
}) => {
  if (hide) return ''

  if (inMaintenance) {
    return 'konnector-error--minor-breaking'
  }

  // userError must be checked first as it is also an error.
  if (userError) {
    return 'konnector-error--major-breaking konnector-error--with-badge'
  }

  if (error) {
    return 'konnector-error--minor-breaking'
  }

  if (hasUpdate) {
    return 'konnector-error--with-badge'
  }

  if (!accountsCount) {
    return 'konnector-error--major-breaking'
  }

  return null
}

class KonnectorTile extends Component {
  render() {
    const {
      accountsCount,
      error,
      inMaintenance,
      userError,
      konnector,
      route,
      t
    } = this.props
    const { domain, features, secure } = this.context
    const hideKonnectorErrors =
      features && features.includes('hide_konnector_errors')
    return (
      <NavLink
        className="item-wrapper"
        to={route}
        title={getKonnectorError({ error, t })}
      >
        <div
          className={classNames(
            'item-icon',
            getErrorClass({
              accountsCount,
              error,
              hide: hideKonnectorErrors,
              userError,
              hasUpdate: !!konnector.available_version,
              inMaintenance
            })
          )}
        >
          <AppIcon
            alt={t('app.logo.alt', { name: konnector.name })}
            app={konnector}
            domain={domain}
            secure={secure}
          />
          <Icon icon={brokenIcon} className="konnector-state" />
        </div>
        <h3 className="item-title">{konnector.name}</h3>
      </NavLink>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { konnector } = props
  return {
    // /!\ error can also be a userError.
    error: getFirstError(state.connections, konnector.slug),
    userError: getFirstUserError(state.connections, konnector.slug),
    lastSyncDate: getLastSyncDate(state.connections, konnector.slug),
    accountsCount: getKonnectorTriggersCount(state, konnector),
    inMaintenance: isInMaintenance(konnector.slug)
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
