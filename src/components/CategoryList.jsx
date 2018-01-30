import React from 'react'

import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'
import ScrollToTopOnMount from './ScrollToTopOnMount'

import { getRegistryKonnectorsByCategory } from '../ducks/registry'
import ConnectionManagement from '../containers/ConnectionManagement'

const CategoryList = ({
  t,
  category,
  categories,
  connectors,
  location,
  wrapper
}) => (
  <div className="content">
    <ScrollToTopOnMount target={wrapper} />
    <div className="col-top-bar">
      <h1 className="col-top-bar-title">
        {!categories.includes(category) || category === 'all'
          ? t('nav.providers')
          : t(`category.${category}`)}
      </h1>
    </div>
    <KonnectorList
      base={`${location.pathname}`}
      konnectors={connectors}
      showVoting
    />
    <Route
      path="/providers/:filter/:konnectorSlug"
      render={props => (
        <ConnectionManagement originPath="/providers/:filter" {...props} />
      )}
    />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { filter } = ownProps.match && ownProps.match.params
  return {
    connectors: getRegistryKonnectorsByCategory(
      state.registry,
      filter !== 'all' && filter
    )
  }
}

export default connect(mapStateToProps)(translate()(withRouter(CategoryList)))
