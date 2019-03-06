import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Icon from 'cozy-ui/react/Icon'

import styles from '../styles/triggerFolderLink'

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

export class TriggerFolderLink extends PureComponent {
  render() {
    const { driveApp, label, folderId } = this.props
    const disabled = !driveApp
    return (
      <MaybeLink
        className={classNames(styles['col-account-folder-link'], {
          'u-silver': disabled,
          'u-c-not-allowed': disabled
        })}
        href={driveApp && `${driveApp.links.related}#/files/${folderId}`}
      >
        <Icon className="u-mr-half" icon="openwith" />
        {label}
      </MaybeLink>
    )
  }
}

const mapStateToProps = state => ({
  driveApp: getApp(state.apps, 'drive')
})

export default connect(mapStateToProps)(TriggerFolderLink)
