import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { Q, useQuery } from 'cozy-client'
import Icon from 'cozy-ui/transpiled/react/Icon'

import styles from 'styles/triggerFolderLink.styl'

import OpenwithIcon from 'cozy-ui/transpiled/react/Icons/Openwith'

/**
 * Renders a link only if href prop is provided
 */
class MaybeLink extends PureComponent {
  render() {
    const { className, href } = this.props
    return href ? (
      <a className={className} href={href} target="_parent">
        {this.props.children}
      </a>
    ) : (
      <span className={className}>{this.props.children}</span>
    )
  }
}

export const TriggerFolderLink = ({ folderId, label }) => {
  const driveQuery = useQuery(Q('io.cozy.apps').getById('io.cozy.apps/drive'))

  return (
    <MaybeLink
      className={classNames(styles['col-trigger-folder-link'], {
        'u-silver': driveQuery.fetchStatus !== 'loaded',
        'u-c-not-allowed': driveQuery.fetchStatus !== 'loaded'
      })}
      href={
        driveQuery.data &&
        driveQuery.data.length > 0 &&
        `${driveQuery.data.links.related}#/files/${folderId}`
      }
    >
      <Icon className="u-mr-half" icon={OpenwithIcon} />
      {label}
    </MaybeLink>
  )
}

export default TriggerFolderLink
