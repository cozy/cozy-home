import styles from '../styles/konnectorHeaderIcon'
import React from 'react'

import { getKonnectorIcon } from '../lib/icons'

export const KonnectorHeaderIcon = ({ konnector }) => (
  <div className={styles['col-konnector-header-icon-wrapper']}>
    <img
      className={styles['col-konnector-header-icon']}
      src={getKonnectorIcon(konnector)}
    />
  </div>
)

export default KonnectorHeaderIcon
