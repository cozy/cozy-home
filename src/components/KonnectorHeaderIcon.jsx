import styles from '../styles/konnectorHeaderIcon'
import React from 'react'

import { getKonnectorIcon } from '../lib/icons'

export const KonnectorHeaderIcon = ({ konnector, center }) => (
  <div
    className={
      styles[`col-konnector-header-icon-wrapper${center ? '--center' : ''}`]
    }
  >
    <img
      className={styles[`col-konnector-header-icon${center ? '--center' : ''}`]}
      src={getKonnectorIcon(konnector)}
    />
  </div>
)

export default KonnectorHeaderIcon
