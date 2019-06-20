import React, { Component } from 'react'
import { AppIcon } from 'cozy-ui/react/AppIcon'
import { translate } from 'cozy-ui/react/I18n'
import PropTypes from 'prop-types'

import styles from 'styles/konnectorHeaderIcon'

export class KonnectorHeaderIcon extends Component {
  render() {
    const { center, konnector, t } = this.props
    const { domain, secure } = this.context
    return (
      <div
        className={
          styles[`col-konnector-header-icon-wrapper${center ? '--center' : ''}`]
        }
      >
        <AppIcon
          alt={t('app.logo.alt', { name: konnector.name })}
          app={konnector}
          domain={domain}
          className={
            styles[`col-konnector-header-icon${center ? '--center' : ''}`]
          }
          secure={secure}
        />
      </div>
    )
  }
}

KonnectorHeaderIcon.contextTypes = {
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
}

export default translate()(KonnectorHeaderIcon)
