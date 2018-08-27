import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { translate } from 'cozy-ui/react/I18n'

import Icon from 'cozy-ui/react/Icon'
import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
import { getErrorTitle } from '../lib/konnectors'
import {
  getFirstError,
  getFirstUserError,
  getLastSyncDate
} from '../ducks/connections'

import forbiddenIcon from '../assets/sprites/icon-forbidden.svg'
import konnectorIcon from '../assets/icons/icon-konnector.svg'
import syncIcon from '../assets/sprites/icon-sync.svg'

const validCategoriesSet = new Set(require('../config/categories'))

const KonnectorTileFooter = ({ lastSyncDate, error, userError, t }) => {
  if (userError) {
    return (
      <span className="item-subtitle-user-error">
        <Icon icon="warning" className="icon" />
        {getErrorTitle(t, userError, key => `connection.error.${key}.title`)}
      </span>
    )
  }

  if (error) {
    return (
      <span className="item-subtitle-error">
        <Icon icon={forbiddenIcon} className="icon" />
        {getErrorTitle(t, error, key => `connection.error.${key}.title`)}
      </span>
    )
  }

  if (lastSyncDate) {
    return (
      <span className="item-subtitle-last-sync">
        <Icon icon={syncIcon} className="icon" />
        {moment
          .utc(lastSyncDate)
          .format(t('tile.konnector.lastSyncDate.format'))}
      </span>
    )
  }

  return null
}

const KonnectorTile = ({
  firstError,
  firstUserError,
  konnector,
  lastSyncDate,
  route,
  t
}) => {
  const categoriesSet = konnector.categories
    ? konnector.categories
        .map(c => (validCategoriesSet.has(c) ? c : 'other'))
        .reduce((acc, c) => acc.add(c), new Set())
    : new Set()
  const subtitle =
    categoriesSet && [...categoriesSet].map(c => t(`category.${c}`)).join(', ')

  return (
    <NavLink className="item-wrapper" to={route}>
      <header className="item-header">
        <div className="item-layered-item-icon">
          <img
            className="item-icon"
            alt={t('connector.logo.alt', { name: konnector.name })}
            src={getKonnectorIcon(konnector)}
          />
          {konnectorIcon && (
            <Icon icon={konnectorIcon} className="item-layer-icon" />
          )}
        </div>
      </header>
      <h3 className="item-title">{konnector.name}</h3>
      <KonnectorTileFooter
        error={firstError}
        userError={firstUserError}
        lastSyncDate={lastSyncDate}
        subtitle={subtitle}
        t={t}
      />
    </NavLink>
  )
}

const mapStateToProps = (state, props) => {
  const { konnector } = props
  return {
    firstError: getFirstError(state.connections, konnector.slug),
    firstUserError: getFirstUserError(state.connections, konnector.slug),
    lastSyncDate: getLastSyncDate(state.connections, konnector.slug)
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
