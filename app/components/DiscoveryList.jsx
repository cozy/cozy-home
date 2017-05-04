/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'
import UseCaseList from './UseCaseList'

const DiscoveryList = ({ t, useCases, context, children }) => (
  <div class='content'>
    <h1>{t('data_connect discovery title')}</h1>
    <UseCaseList useCases={useCases} context={context} />
    {children}
  </div>
)

export default translate()(DiscoveryList)
