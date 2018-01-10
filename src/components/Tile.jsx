import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { getKonnectorIcon } from '../lib/icons'
import { translate } from 'cozy-ui/react/I18n'

const Tile = props => {
  const { footer, konnector, route, location, subtitle, t } = props
  const { name } = konnector
  return (
    <NavLink className="item-wrapper" to={`${location.pathname}/${route}`}>
      <header className="item-header">
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <h3 className="item-title">{name}</h3>
      {subtitle && <p className="item-subtitle">{subtitle}</p>}
      {footer}
    </NavLink>
  )
}

export default translate()(withRouter(Tile))
