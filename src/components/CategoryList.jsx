import React from 'react'

import { connect } from 'react-redux'

import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'

import { getRegistryKonnectorsByCategory } from '../ducks/registry'

const CategoryList = ({ t, category, categories, connectors, children }) => (
  <div className="content">
    <div className="col-top-bar">
      <h1 className="col-top-bar-title">
        {!categories.includes(category) || category === 'all'
          ? t('nav.providers')
          : t(`category.${category}`)}
      </h1>
    </div>
    <KonnectorList konnectors={connectors} showVoting />
    {children}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { filter } = ownProps.params
  return {
    connectors: getRegistryKonnectorsByCategory(
      state.registry,
      filter !== 'all' && filter
    )
  }
}

export default connect(mapStateToProps)(translate()(CategoryList))
