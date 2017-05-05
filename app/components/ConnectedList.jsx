import React from 'react'
import { translate } from '../plugins/preact-polyglot'
import ConnectorList from './ConnectorList'

const ConnectedList = ({ t, connectors, children }) => (
  <div className='content'>
    <h1>{t('connected title')}</h1>
    <ConnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(ConnectedList)
