import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import useRegistryInformation from 'hooks/useRegistryInformation'
import { KonnectorSuggestionModal } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react'

const CandidateServiceTile = ({ konnector }) => {
  const { t } = useI18n()
  const client = useClient()
  const { slug } = konnector
  const registryData = useRegistryInformation(client, slug)
  const name = registryData
    ? get(registryData, 'latest_version.manifest.name', slug)
    : ''
  const [isModalDisplayed, setModalDisplayed] = useState(false)

  return (
    <>
      {isModalDisplayed && (
        <KonnectorSuggestionModal
          konnectorAppSuggestion={konnector}
          konnectorManifest={get(registryData, 'latest_version.manifest', {})}
          onClose={() => {
            setModalDisplayed(false)
          }}
          onSilence={() => {
            setModalDisplayed(false)
            Alerter.success(t('connector.silenced', { name: name }))
          }}
        />
      )}
      <div className="item item--ghost" onClick={() => setModalDisplayed(true)}>
        <div className="item-icon">
          <AppIcon alt={t('app.logo.alt', { name })} app={slug} />
        </div>
        <span className="item-title">{name}</span>
      </div>
    </>
  )
}

CandidateServiceTile.propTypes = {
  konnector: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

export default CandidateServiceTile
