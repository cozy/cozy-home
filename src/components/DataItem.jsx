import styles from '../styles/dataItem'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'

export const DataItem = ({ t, dataType }) => {
  const iconPath = '../assets/sprites/icon-' + dataType + '.svg'
  let icon
  try {
    icon = require(iconPath).default
  } catch (error) {
    console.error(`Unable to load the icon ${iconPath} : ${error.message}`)
  }

  if (!icon) {
    try {
      icon = require('../assets/sprites/icon-fallback.svg').default
    } catch (error) {
      console.error('Default icon icon-fallback.svg cannot be loaded')
    }
  }

  return (
    <li className={styles['col-data-item']}>
      <Icon
        className={styles['col-data-item-icon']}
        icon={icon}
        width="32px"
        height="32px"
      />
      {t(`dataType.${dataType}`)}
    </li>
  )
}

export default translate()(DataItem)
