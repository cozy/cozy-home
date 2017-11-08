import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'

const CategoryList = ({ t, category, connectors, children }) => (
  <div className="content">
    <div className="con-top-bar">
      <h1 className="con-top-bar-title">
        {category === 'all' ? t('nav.providers') : t(`category.${category}`)}
      </h1>
    </div>
    <KonnectorList connectors={connectors} showVoting />
    {children}
  </div>
)

export default translate()(CategoryList)
