import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useClient } from 'cozy-client'
import useRegistryInformation from 'hooks/useRegistryInformation'
import { KonnectorSuggestionModal } from 'cozy-harvest-lib'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const CandidateServiceTile = ({ konnector }) => {
  const { t } = useI18n()
  const client = useClient()
  const { showAlert } = useAlert()
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
            showAlert({
              message: t('connector.silenced', { name: name }),
              severity: 'success'
            })
          }}
        />
      )}
      <div
        className="scale-hover u-c-pointer"
        onClick={() => setModalDisplayed(true)}
      >
        <SquareAppIcon
          app={slug}
          type="konnector"
          name={name}
          variant="ghost"
        />
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
