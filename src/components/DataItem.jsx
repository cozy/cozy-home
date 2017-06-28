import styles from '../styles/dataItem'

import React from 'react'
import { translate } from '../plugins/i18n'

export const DataItem = ({ t, dataType, hex }) => (
  <li className={styles['col-data-item']}>
    <svg className={styles['col-data-item-icon']} style={{color: hex}}>
      <use xlinkHref={require('../assets/sprites/icon-' + dataType + '.svg')} />
    </svg>
    {t(`dataType.${dataType}`)}
  </li>
)

export default translate()(DataItem)
