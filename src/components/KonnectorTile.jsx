import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { NavLink, withRouter } from 'react-router-dom'

import { getKonnectorIcon } from '../lib/icons'
import { getKonnectorTriggersCount } from '../reducers'

const KonnectorTile = ({ footer, konnector, route, t }) => {
  const categories = konnector.categories
    ? konnector.categories.map(c => t(`category.${c}`))
    : []
  const subtitle = categories.join(', ')
  return (
    <NavLink className="item-wrapper" to={route}>
      <header className="item-header">
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <h3 className="item-title">{konnector.name}</h3>
      {subtitle && <p className="item-subtitle">{subtitle}</p>}
      {footer}
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

const buildFooter = (state, props) => {
  if (props.markErrored) return svgIcon('warning')

  const accountsCount = getKonnectorTriggersCount(state, props.konnector)

  if (accountsCount)
    return (
      <span
        className="item-count"
        title={props.t('connector.accounts_count', { count: accountsCount })}
      >
        {accountsCount}
      </span>
    )
}

const mapStateToProps = (state, props) => {
  return {
    footer: buildFooter(state, props)
  }
}

export default translate()(connect(mapStateToProps)(withRouter(KonnectorTile)))
