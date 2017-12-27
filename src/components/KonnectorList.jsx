import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import ConnectedTile from './ConnectedTile'
import KonnectorTile from './KonnectorTile'
import { popupCenter } from '../lib/popup'

const VOTING_LINK = 'https://framaforms.org/cozy-collect-1494574386'

const KonnectorList = ({
  t,
  konnectors,
  showVoting = false,
  displayAccounts = false
}) => (
  <div className="connector-list">
    {displayAccounts &&
      konnectors.map(konnector => <ConnectedTile konnector={konnector} />)}
    {!displayAccounts &&
      konnectors.map(konnector => (
        <KonnectorTile
          konnector={konnector}
          subtitle={t(`category.${konnector.category}`)}
          route={`${konnector.slug}`}
        />
      ))}
    {showVoting && (
      <a
        className="item-wrapper col-voting-item"
        onClick={() => popupCenter(VOTING_LINK, 'connectorVoting', 700, 650)}
      >
        <header className="item-header">
          <img
            className="item-icon"
            src={require('../assets/icons/konnectors/icon-voting.svg')}
          />
        </header>
        <p className="item-title item-voting-text">{t('connector.voting')}</p>
      </a>
    )}
  </div>
)

export default translate()(KonnectorList)
