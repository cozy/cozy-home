import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Icon from 'cozy-ui/react/Icon'
import { translate } from 'cozy-ui/react/I18n'

import styles from '../styles/konnectorFolder'

import { getApp } from '../ducks/apps'

/**
 * Renders a link only if href prop is provided
 */
class MaybeLink extends PureComponent {
  render() {
    const { className, href } = this.props
    return href ? (
      <a className={className} href={href}>
        {this.props.children}
      </a>
    ) : (
      <span className={className}>{this.props.children}</span>
    )
  }
}

export class KonnectorFolder extends PureComponent {
  render() {
    const { driveApp, t, trigger } = this.props
    const disabled = !driveApp
    return (
      <MaybeLink
        className={classNames(styles['col-account-folder-link'], {
          'u-silver': disabled,
          'u-c-not-allowed': disabled
        })}
        href={
          driveApp &&
          `${driveApp.links.related}#/files/${trigger.message.folder_to_save}`
        }
      >
        <Icon className="u-mr-half" icon="openwith" />
        {t('account.folder.link')}
      </MaybeLink>
    )
  }
}

const mapStateToProps = state => ({
  driveApp: getApp(state.apps, 'drive')
})

export default connect(mapStateToProps)(translate()(KonnectorFolder))
