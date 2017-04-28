/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'
import ConnectorList from './ConnectorList'

const PinnedList = ({ t, connectors, children }) => (
  <div class='content'>
    <h1>{t('my_accounts pinned title')}</h1>
    <ConnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(PinnedList)
