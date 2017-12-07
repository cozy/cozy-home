import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'

const CategoryList = ({ t, category, categories, connectors, children }) => (
  <div className="content">
    <div className="col-top-bar">
      <h1 className="col-top-bar-title">
        {!categories.includes(category) || category === 'all'
          ? t('nav.providers')
          : t(`category.${category}`)}
      </h1>
    </div>
    <KonnectorList connectors={connectors} showVoting />
    {children}
  </div>
)

export default translate()(CategoryList)
