import styles from '../../styles/konnectorItem'

import React from 'react'

import { translate } from 'cozy-ui/react/I18n'

import { getKonnectorIcon } from '../../lib/icons'
import { CONNECTION_STATUS } from '../../lib/CollectStore'

const ServiceKonnectorsList = ({ t, konnectorsList, showKonnector }) => (
  <ul className="connector-list">
    {konnectorsList.map(konnector => (
      <li
        onKeyDown={e => (e.keyCode === 13 ? showKonnector(konnector) : null)}
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
        {konnector.category && (
          <p className="item-subtitle">{t(`category.${konnector.category}`)}</p>
        )}
        {konnector.status && stateIcon(konnector.status)}
      </li>
    ))}
  </ul>
)

const svgIcon = name => (
  <svg className="item-status-icon">
    <use xlinkHref={require(`../../assets/sprites/icon-${name}.svg`)} /> }
  </svg>
)

const stateIcon = status => {
  switch (status) {
    case CONNECTION_STATUS.ERRORED:
      return svgIcon('warning')
    case CONNECTION_STATUS.CONNECTED:
      return svgIcon('check')
    case CONNECTION_STATUS.RUNNING:
      return <span className={styles['col-konnector-status-running']} />
    default:
      return null
  }
}

export default translate()(ServiceKonnectorsList)
