import React from 'react'
import { translate } from '../plugins/i18n'
import ConnectorList from './ConnectorList'

const CategoryList = ({ t, category, connectors, children }) => (
  <div className='content'>
    <h1>{category === 'all' ? t('nav.category') : t(`category.${category}`)}</h1>
    <ConnectorList connectors={connectors} showVoting />
    {children}
  </div>
)

export default translate()(CategoryList)
