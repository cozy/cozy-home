import styles from '../styles/connectedTile'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { CONNECTION_STATUS } from '../lib/CollectStore'
import { getAccountName } from '../lib/helpers'

import { getConnectionStatusForTrigger } from '../ducks/connections'

import Tile from './Tile'

const TriggerTile = props => (
  <Tile subtitle={getAccountName(props.account)} {...props} />
)

const svgIcon = name => (
  <svg className="item-status-icon">
    <use
      xlinkHref={'#' + require(`../assets/sprites/icon-${name}.svg`).default.id}
    />
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

const mapStateToProps = (state, props) => ({
  footer: stateIcon(
    getConnectionStatusForTrigger(state.connections, props.trigger)
  )
})

export default connect(mapStateToProps)(translate()(TriggerTile))
