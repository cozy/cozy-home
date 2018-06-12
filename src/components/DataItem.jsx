import styles from '../styles/dataItem'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'

export const DataItem = ({ t, dataType }) => {
  let icon
  try {
    icon = require(`../assets/sprites/icon-${dataType}.svg`).default
  } catch (error) {
    console.error(
      `Unable to load the icon ../assets/sprites/icon-${dataType}.svg : ${
        error.message
      }`
    )
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
      {icon && (
        <Icon
          className={styles['col-data-item-icon']}
          icon={icon}
          width="32px"
          height="32px"
        />
      )}
      {t(`dataType.${dataType}`)}
    </li>
  )
}

export default translate()(DataItem)
