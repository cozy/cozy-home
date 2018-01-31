import styles from '../styles/dataItem'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'

export const DataItem = ({ t, dataType }) => (
  <li className={styles['col-data-item']}>
    <Icon
      className={styles['col-data-item-icon']}
      icon={require('../assets/sprites/icon-' + dataType + '.svg').default}
      width="32px"
      height="32px"
    />
    {t(`dataType.${dataType}`)}
  </li>
)

export default translate()(DataItem)
