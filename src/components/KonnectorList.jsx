import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorTile from './KonnectorTile'
import { popupCenter } from '../lib/popup'

const VOTING_LINK = 'https://framaforms.org/collect-1518082910'

const KonnectorList = ({ base, t, konnectors, showVoting = false }) => (
  <div className="connector-list">
    {konnectors.map(konnector => (
      <KonnectorTile
        konnector={konnector}
        route={`${base}/${konnector.slug}`}
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
            src={require('../assets/konnectors/icon-voting.svg')}
          />
        </header>
        <p className="item-title item-voting-text">{t('connector.voting')}</p>
      </a>
    )}
  </div>
)

export default translate()(KonnectorList)
