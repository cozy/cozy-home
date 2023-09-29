import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import PropTypes from 'prop-types'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

import styles from 'styles/konnectorHeaderIcon.styl'

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
        />
      </div>
    )
  }
}

KonnectorHeaderIcon.propTypes = {
  center: PropTypes.bool,
  konnector: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(KonnectorHeaderIcon)
