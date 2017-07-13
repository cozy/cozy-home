import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorList from './KonnectorList'

const ConnectedList = ({ t, connectors, children }) => (
  <div className='content'>
    <h1>{t('nav.connected')}</h1>
    <KonnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(ConnectedList)
