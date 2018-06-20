import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
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
      {hasUserError ? svgIcon('warning') : svgIcon('check')}
    </NavLink>
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
    hasUserError: hasAtLeastOneTriggerWithUserError(
      state.connections,
      konnector.slug
    )
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
