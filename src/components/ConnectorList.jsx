import React from 'react'
import { translate } from '../plugins/i18n'
import ConnectorItem from './ConnectorItem'

const VOTING_LINK = 'https://framaforms.org/cozy-collect-1494574386'

const ConnectorList = ({ t, connectors, showConnectedBadge = true, showVoting = false }) => (
  <div className='connector-list'>
    {connectors.map(c =>
      <ConnectorItem
        title={c.name}
        subtitle={t(`category.${c.category}`)}
        connected={showConnectedBadge && c.accounts.length !== 0}
        errored={!!c.accounts.error}
        iconName={c.slug}
        slug={c.slug}
        enableDefaultIcon
        backgroundCSS=''
      />
    )}
    {showVoting &&
      <a
        className='item-wrapper con-voting-item'
        href={VOTING_LINK}
        target='_blank'
      >
        <header className='item-header'>
          <img className='item-icon' src={require('../assets/icons/konnectors/icon-voting.svg')} />
        </header>
        <p class='item-title item-voting-text'>{t('connector.voting')}</p>
      </a>
    }
  </div>
)

export default translate()(ConnectorList)
