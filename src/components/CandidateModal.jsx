import React from 'react'
import { withClient } from 'cozy-client'
import Modal, {
  ModalContent,
  ModalFooter
} from 'cozy-ui/transpiled/react/Modal'
import AppLinker, { generateWebLink } from 'cozy-ui/react/AppLinker'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import Text, { SubTitle } from 'cozy-ui/react/Text'

import useAppDataset from 'hooks/useAppDataset'

const CandidateModal = ({ client, slug }) => {
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover/${slug}`
  const { cozySubdomainType: subDomainType } = useAppDataset()

  return (
    <Modal mobileFullscreen>
      <ModalContent className="u-flex-grow-1 u-flex u-flex-column u-flex-items-center">
        <SubTitle>Importer mes données EDF</SubTitle>
        <Text>Lorem ipsum dolor si amet</Text>
      </ModalContent>
      <ModalFooter>
        <AppLinker
          slug={app}
          nativePath={nativePath}
          href={generateWebLink({
            cozyUrl: cozyURL.origin,
            slug: app,
            nativePath,
            subDomainType
          })}
        >
          {({ onClick, href }) => (
            <ButtonLink onClick={onClick} href={href} label="store" />
          )}
        </AppLinker>
        <Button theme="secondary" label="nope" />
      </ModalFooter>
    </Modal>
  )
}

export default withClient(CandidateModal)
