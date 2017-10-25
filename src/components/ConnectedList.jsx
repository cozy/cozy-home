import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Link } from 'react-router'
import KonnectorList from './KonnectorList'

const ConnectedList = ({ t, connectors, children }) => (
  <div className='content'>
    <div className='con-top-bar'>
      <h1>{t('nav.connected')}</h1>
      <Link to='/category/all'>
        <button className='coz-btn coz-btn--regular'>
          {t('add_account')}
        </button>
      </Link>
    </div>
    <KonnectorList connectors={connectors} />
    {children}
  </div>
)

export default translate()(ConnectedList)
