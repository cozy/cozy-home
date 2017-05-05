/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'
import ConnectorItem from './ConnectorItem'

const ConnectorList = ({ t, connectors, showConnectedBadge = true }) => (
  <div className='connector-list'>
    {connectors.map(c =>
      <ConnectorItem
        title={c.name}
        subtitle={t(c.category + ' category')}
        connected={showConnectedBadge && c.accounts.length !== 0}
        iconName={c.slug}
        slug={c.slug}
        enableDefaultIcon
        backgroundCSS=''
      />
    )}
  </div>
)

export default translate()(ConnectorList)
