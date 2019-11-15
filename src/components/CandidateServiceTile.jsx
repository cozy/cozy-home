import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { translate } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'
import AppIcon from 'components/AppIcon'
import useRegistryInformation from 'hooks/useRegistryInformation'
import KonnectorSuggestionModal from 'components/KonnectorSuggestionModal'

const CandidateServiceTile = ({ t, client, konnector }) => {
  const { slug } = konnector
  const registryData = useRegistryInformation(client, slug)
  const name = registryData
    ? get(registryData, 'latest_version.manifest.name', slug)
    : ''
  const [isModalDisplayed, setModalDisplayed] = useState(true)

  return (
    <div className="item item--ghost" onClick={() => setModalDisplayed(true)}>
      {isModalDisplayed && <KonnectorSuggestionModal konnector={konnector} />}
      <div className="item-icon">
        <AppIcon alt={t('app.logo.alt', { name })} app={slug} />
      </div>
      <span className="item-title">{name}</span>
    </div>
  )
}

CandidateServiceTile.propTypes = {
  t: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  app: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

export default translate()(withClient(CandidateServiceTile))
