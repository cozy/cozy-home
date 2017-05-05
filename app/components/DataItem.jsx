import React from 'react'
import { translate } from '../plugins/i18n'

const DataItem = ({ t, dataType, hex }) => (
  <li className='account-data'>
    <svg className='account-dataIcon' style={{color: hex}}>
      <use xlinkHref={require('../assets/sprites/icon-' + dataType + '.svg')} />
    </svg>
    {t('dataType ' + dataType)}
  </li>
)

export default translate()(DataItem)
