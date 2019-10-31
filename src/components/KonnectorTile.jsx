import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import AppIcon from 'cozy-ui/react/AppIcon'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import palette from 'cozy-ui/stylus/settings/palette.json'

import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from 'ducks/connections'
import { getErrorTitle } from 'lib/konnectors'
import { getKonnectorTriggersCount } from 'reducers'

const getKonnectorError = ({ error, t }) => {
  return error
    ? getErrorTitle(t, error, key => `connection.error.${key}.title`)
    : null
}

const STATUS = {
  OK: 0,
  UPDATE: 1,
  MAINTENANCE: 2,
  ERROR: 3,
  NO_ACCOUNT: 4
}

export class KonnectorTile extends Component {
  render() {
    const {
      accountsCount,
      error,
      isInMaintenance,
      userError,
      konnector,
      route,
      t
    } = this.props
    const { domain, secure } = this.context

    let status

    if (konnector.available_version) status = STATUS.UPDATE
    else if (isInMaintenance) status = STATUS.MAINTENANCE
    else if (error || userError) status = STATUS.ERROR
    else if (!accountsCount) status = STATUS.NO_ACCOUNT
    else status = STATUS.OK

    return (
      <NavLink
        className={classNames('item', {
          'item--ghost': status === STATUS.NO_ACCOUNT,
          'item--maintenance': status === STATUS.MAINTENANCE
        })}
        to={route}
        title={getKonnectorError({ error, t })}
      >
        <div className="item-icon">
          <AppIcon
            alt={t('app.logo.alt', { name: konnector.name })}
            app={konnector}
            domain={domain}
            secure={secure}
          />
          {status === STATUS.MAINTENANCE && (
            <Icon
              icon="wrench-circle"
              className="item-status"
              color={palette.coolGrey}
            />
          )}
          {status === STATUS.ERROR && (
            <Icon
              icon="warning-circle"
              className="item-status"
              color={palette.pomegranate}
            />
          )}
        </div>
        <h3 className="item-title">{konnector.name}</h3>
      </NavLink>
    )
  }
}

KonnectorTile.contextTypes = {
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
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
