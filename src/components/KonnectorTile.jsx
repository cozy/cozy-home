import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import classNames from 'classnames'

import AppIcon from 'cozy-ui/react/AppIcon'
import Icon from 'cozy-ui/react/Icon'
import { NavLink, withRouter } from 'react-router-dom'

import { fetchIcon } from '../lib/icons'
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

const getErrorClass = ({ accountsCount, error, hide, userError }) => {
  if (hide) return ''

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

class KonnectorTile extends Component {
  render() {
    const { accountsCount, error, userError, konnector, route, t } = this.props
    const { client, features } = this.context
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
              userError
            })
          )}
        >
          <AppIcon
            alt={t('app.logo.alt', { name: konnector.name })}
            app={konnector}
            fetchIcon={fetchIcon(client, konnector)}
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
    accountsCount: getKonnectorTriggersCount(state, konnector)
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
