import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'

const CategoryList = ({ t, category, connectors, children }) => (
  <div className='content'>
    <h1>{category === 'all' ? t('nav.category') : t(`category.${category}`)}</h1>
    <KonnectorList connectors={connectors} showVoting />
    {children}
  </div>
)

export default translate()(CategoryList)
