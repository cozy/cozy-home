/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'
import ConnectorList from './ConnectorList'

const CategoryList = ({ t, category, connectors, children }) => (
  <div className='content'>
    <h1>{category === 'all' ? t('category title') : t(`${category} category`)}</h1>
    <ConnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(CategoryList)
