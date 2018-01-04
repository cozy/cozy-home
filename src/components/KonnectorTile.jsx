import React from 'react'
import { Link, withRouter } from 'react-router'
import { getKonnectorIcon } from '../lib/icons'
import { translate } from 'cozy-ui/react/I18n'

const KonnectorTile = props => {
  const { icon, konnector, route, router, subtitle, t } = props
  const { name } = konnector
  return (
    <Link className="item-wrapper" to={`${router.location.pathname}/${route}`}>
      <header className="item-header">
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <h3 className="item-title">{name}</h3>
      {subtitle && <p className="item-subtitle">{subtitle}</p>}
      {icon}
    </Link>
  )
}

export default translate()(withRouter(KonnectorTile))
