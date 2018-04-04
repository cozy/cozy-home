import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
import { getKonnectorTriggersCount } from '../reducers'
import { hasAtLeastOneTriggerWithUserError } from '../ducks/connections'

const KonnectorTile = ({
  accountsCount,
  hasUserError,
  konnector,
  route,
  t
}) => {
  const categories = konnector.categories
    ? konnector.categories.map(c => t(`category.${c}`))
    : []
  const subtitle = categories.join(', ')
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
      {subtitle && <p className="item-subtitle">{subtitle}</p>}
      <KonnectorTileFooter
        accountsCount={accountsCount}
        hasUserError={hasUserError}
        title={t('connector.accounts_count', { count: accountsCount })}
      />
    </NavLink>
  )
}

const KonnectorTileFooter = ({ accountsCount, hasUserError, title }) => {
  if (hasUserError) return svgIcon('warning')
  if (!accountsCount) return svgIcon('new')

  return (
    <span className="item-count" title={title}>
      {accountsCount}
    </span>
  )
}

const svgIcon = name => (
  <svg className="item-status-icon">
    <use
      xlinkHref={'#' + require(`../assets/sprites/icon-${name}.svg`).default.id}
    />
  </svg>
)

const mapStateToProps = (state, props) => {
  const { konnector } = props
  return {
    accountsCount: getKonnectorTriggersCount(state, konnector),
    hasUserError: hasAtLeastOneTriggerWithUserError(
      state.connections,
      konnector.slug
    )
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
