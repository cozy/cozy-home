import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import Icon from 'cozy-ui/react/Icon'
import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
import { getKonnectorTriggersCount } from '../reducers'
import {
  hasAtLeastOneTriggerWithError,
  hasAtLeastOneTriggerWithUserError
} from '../ducks/connections'

const validCategoriesSet = new Set(require('../config/categories'))

const KonnectorTileFooter = ({
  accountsCount,
  hasError,
  hasUserError,
  subtitle,
  t
}) =>
  accountsCount ? (
    <div>
      {!!subtitle && <p className="item-subtitle">{subtitle}</p>}
      {hasUserError ? (
        <Icon className="item-status-icon" icon="warning" />
      ) : hasError ? (
        <Icon className="item-status-icon" icon="forbidden" />
      ) : (
        <Icon className="item-status-icon" color="#2bba40" icon="check" />
      )}
    </div>
  ) : (
    <span className="item-subtitle-no-account">{t('connector.noAccount')}</span>
  )

const KonnectorTile = ({
  accountsCount,
  hasError,
  hasUserError,
  konnector,
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
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name: konnector.name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <h3 className="item-title">{konnector.name}</h3>
      <KonnectorTileFooter
        accountsCount={accountsCount}
        hasError={hasError}
        hasUserError={hasUserError}
        subtitle={subtitle}
        t={t}
      />
    </NavLink>
  )
}

const mapStateToProps = (state, props) => {
  const { konnector } = props
  return {
    accountsCount: getKonnectorTriggersCount(state, konnector),
    hasError: hasAtLeastOneTriggerWithError(state.connections, konnector.slug),
    hasUserError: hasAtLeastOneTriggerWithUserError(
      state.connections,
      konnector.slug
    )
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
