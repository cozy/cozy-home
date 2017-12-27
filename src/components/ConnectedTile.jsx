import styles from '../styles/connectedTile'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { CONNECTION_STATUS } from '../lib/CollectStore'
import { getAccountName } from '../lib/helpers'

import { getConnectionStatus, getKonnectorConnectedAccount } from '../reducers'

import KonnectorTile from './KonnectorTile'

const ConnectedTile = props => (
  <KonnectorTile
    route={`${props.konnector.slug}/${props.account._id}`}
    {...props}
  />
)

const svgIcon = name => (
  <svg className="item-status-icon">
    <use xlinkHref={require(`../assets/sprites/icon-${name}.svg`)} /> }
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

const mapStateToProps = (state, props) => {
  return {
    icon: stateIcon(getConnectionStatus(state, props.konnector)),
    subtitle: getAccountName(
      getKonnectorConnectedAccount(state, props.konnector)
    )
  }
}

export default connect(mapStateToProps)(translate()(ConnectedTile))
