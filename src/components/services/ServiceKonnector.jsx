import React from 'react'

import { translate } from 'cozy-ui/react/I18n'

import { getKonnectorIcon } from '../../lib/icons'

const ENTER_KEY = 13

const ServiceKonnector = ({ t, konnector, showKonnector }) => {
  const categories = konnector.categories.map(category =>
    t(`category.${category}`)
  )
  return (
    <li
      onKeyDown={e =>
        e.keyCode === ENTER_KEY ? showKonnector(konnector) : null
      }
      onClick={() => showKonnector(konnector)}
      tabIndex="0"
      className="item-wrapper"
    >
      <header className="item-header">
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <p className="item-title">{konnector.name}</p>
      {konnector.categories && (
        <p className="item-subtitle">{categories.join(', ')}</p>
      )}
    </li>
  )
}

ServiceKonnector.componentDidMount = () => window.scrollTo(0, 0)

export default translate()(ServiceKonnector)
