import styles from '../../styles/konnectorItem'

import React from 'react'
import { connect } from 'react-redux'

import { translate } from 'cozy-ui/react/I18n'

import { getConnectionsStatusesByKonnectors } from '../../ducks/connections'
import { getKonnectorIcon } from '../../lib/icons'
import { CONNECTION_STATUS } from '../../lib/CollectStore'

const ServiceKonnectorsList = ({
  konnectorsList,
  showKonnector,
  t,
  connectionStatuses
}) => (
  <ul className="connector-list">
    {konnectorsList.map(konnector => {
      return (
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
            <p className="item-subtitle">
              {t(`category.${konnector.category}`)}
            </p>
          )}
          {connectionStatuses[konnector.slug] &&
            stateIcon(connectionStatuses[konnector.slug])}
        </li>
      )
    })}
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

const mapStateToProps = (state, ownProps) => ({
  connectionStatuses:
    (ownProps.konnectorsList &&
      getConnectionsStatusesByKonnectors(
        state,
        ownProps.konnectorsList.map(konnector => konnector)
      )) ||
    []
})

export default connect(mapStateToProps)(translate()(ServiceKonnectorsList))
