import styles from '../styles/konnectorHeaderIcon'
import React, { Component } from 'react'

import { AppIcon } from 'cozy-ui/react/AppIcon'
import { appIconProps } from 'lib/icons'
import { translate } from 'cozy-ui/react/I18n'

export class KonnectorHeaderIcon extends Component {
  render() {
    const { center, konnector, t } = this.props
    return (
      <div
        className={
          styles[`col-konnector-header-icon-wrapper${center ? '--center' : ''}`]
        }
      >
        <AppIcon
          alt={t('app.logo.alt', { name: konnector.name })}
          app={konnector}
          className={
            styles[`col-konnector-header-icon${center ? '--center' : ''}`]
          }
          {...appIconProps}
        />
      </div>
    )
  }
}

export default translate()(KonnectorHeaderIcon)
