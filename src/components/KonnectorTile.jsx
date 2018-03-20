import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { getKonnectorTriggersCount } from '../reducers'

import Tile from './Tile'

const KonnectorTile = ({ footer, konnector, route, t }) => {
  const categories = konnector.categories
    ? konnector.categories.map(c => t(`category.${c}`))
    : []
  const subtitle = categories.join(', ')
  return (
    <Tile
      konnector={konnector}
      route={route}
      subtitle={subtitle}
      footer={footer}
    />
  )
}

const mapStateToProps = (state, props) => {
  const accountsCount = getKonnectorTriggersCount(state, props.konnector)
  return {
    footer: !!accountsCount && (
      <span
        className="item-count"
        title={props.t('connector.accounts_count', { count: accountsCount })}
      >
        {accountsCount}
      </span>
    )
  }
}

export default translate()(connect(mapStateToProps)(KonnectorTile))
