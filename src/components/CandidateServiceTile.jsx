import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { translate } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'
import AppIcon from 'components/AppIcon'
import useRegistryInformation from 'hooks/useRegistryInformation'
import CandidateModal from 'components/CandidateModal'

const CandidateServiceTile = ({ t, slug, client }) => {
  const registryData = useRegistryInformation(client, slug)
  const name = registryData
    ? get(registryData, 'latest_version.manifest.name', slug)
    : ''
  const [isModalDisplayed, setModalDisplay] = useState(true)

  return (
    <div className="item item--ghost" onClick={() => setModalDisplay(true)}>
      {isModalDisplayed && <CandidateModal slug={slug} />}
      <div className="item-icon">
        <AppIcon alt={t('app.logo.alt', { name })} app={slug} />
      </div>
      <span className="item-title">{name}</span>
    </div>
  )
}

CandidateServiceTile.propTypes = {
  slug: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired
}

export default translate()(withClient(CandidateServiceTile))
