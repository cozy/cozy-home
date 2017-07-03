import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import ConnectorList from './ConnectorList'

const ConnectedList = ({ t, connectors, children }) => (
  <div className='content'>
    <h1>{t('nav.connected')}</h1>
    <ConnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(ConnectedList)
