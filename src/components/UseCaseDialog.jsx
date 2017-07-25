import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

const UseCaseDialog = ({ t, item, connectors, context, router }) => {
  const gotoParent = () => {
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  return (<Modal
    title={t(`useCase.${item.slug}.title`)}
    secondaryAction={() => gotoParent()}
  >
    <ModalContent>
      <div className='use-case-dialog'>
        <KonnectorList connectors={connectors} />
      </div>
    </ModalContent>
  </Modal>)
}

export default translate()(UseCaseDialog)
