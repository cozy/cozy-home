import styles from '../styles/dataItem'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'

export const DataItem = ({ t, dataType }) => {
  let icon
  try {
    icon = require('../assets/sprites/icon-' + dataType + '.svg')
  } catch (error) {
    console.warn(
      `Unable to get icon for data type ${dataType}, reason: ${error.message}`
    )
  }

  return (
    <li className={styles['col-data-item']}>
      {icon && (
        <Icon
          className={styles['col-data-item-icon']}
          icon={icon.default}
          width="32px"
          height="32px"
        />
      )}
      {t(`dataType.${dataType}`)}
    </li>
  )
}

export default translate()(DataItem)
