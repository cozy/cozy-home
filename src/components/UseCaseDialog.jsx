import React from 'react'
import { translate } from '../plugins/i18n'
import ConnectorList from './ConnectorList'
import Modal from 'cozy-ui/react/Modal'
import ModalContent from 'cozy-ui/react/Modal/Content'

const UseCaseDialog = ({ t, item, connectors, context, router }) => {
  const gotoParent = () => {
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  return (<Modal
    title={t(`use-case ${item.slug} title`)}
    secondaryAction={() => gotoParent()}
  >
    <ModalContent>
      <div className='use-case-dialog'>
        <ConnectorList connectors={connectors} />
      </div>
    </ModalContent>
  </Modal>)
}

export default translate()(UseCaseDialog)
