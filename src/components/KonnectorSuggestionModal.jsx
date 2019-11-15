import React, { useState } from 'react'
import { withClient } from 'cozy-client'
import Modal, {
  ModalContent,
  ModalFooter
} from 'cozy-ui/transpiled/react/Modal'
import AppLinker, { generateWebLink } from 'cozy-ui/react/AppLinker'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import Text, { SubTitle } from 'cozy-ui/react/Text'

import useAppDataset from 'hooks/useAppDataset'

const KonnectorSuggestionModal = ({ client, konnector, closeModal }) => {
  const { slug } = konnector
  const cozyURL = new URL(client.getStackClient().uri)
  const storeAppName = 'store'
  const nativePath = `/discover/${slug}`
  const { cozySubdomainType: subDomainType } = useAppDataset()
  const [isSilencing, setIsSilencing] = useState(false)

  const silenceSuggestion = async () => {
    setIsSilencing(true)
    await client.save({ ...konnector, silenced: true })
    setIsSilencing(false)
    closeModal()
  }

  return (
    <Modal mobileFullscreen>
      <ModalContent className="u-flex-grow-1 u-flex u-flex-column u-flex-items-center">
        <SubTitle>Importer mes données EDF</SubTitle>
        <Text>Lorem ipsum dolor si amet</Text>
      </ModalContent>
      <ModalFooter>
        <AppLinker
          slug={storeAppName}
          nativePath={nativePath}
          href={generateWebLink({
            cozyUrl: cozyURL.origin,
            slug: storeAppName,
            nativePath,
            subDomainType
          })}
        >
          {({ onClick, href }) => (
            <ButtonLink onClick={onClick} href={href} label="store" />
          )}
        </AppLinker>
        <Button
          theme="secondary"
          label="nope"
          onClick={silenceSuggestion}
          busy={isSilencing}
        />
      </ModalFooter>
    </Modal>
  )
}

export default withClient(KonnectorSuggestionModal)
