import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut } from 'cozy-client'
import flag from 'cozy-flags'
import { splitFilename } from 'cozy-client/dist/models/file'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Link from 'cozy-ui/transpiled/react/Link'

export const ShortcutLink = ({ display = 'compact', file, ...props }) => {
  const client = useClient()
  const { shortcutInfos, shortcutImg, fetchStatus } = useFetchShortcut(
    client,
    file._id
  )
  const isLoading = fetchStatus === 'loading'

  const { filename } = splitFilename(file)
  const url = get(shortcutInfos, 'data.url', '#')

  /**
   * If we don't have iconMimeType, we consider that the icon is a binary svg.
   * Otherwise we consider that the icon comes from Iconizer api so it is in base64 directly.
   */
  const icon = get(file, 'attributes.metadata.icon')
  const iconMimeType = get(file, 'attributes.metadata.iconMimeType')
  const description = get(file, 'attributes.metadata.description')

  return (
    <Link
      underline="none"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="scale-hover"
      {...props}
    >
      {icon || shortcutImg ? (
        <SquareAppIcon
          name={filename}
          variant="shortcut"
          display={display}
          description={description}
          IconContent={
            <div className="u-w-2 u-h-2">
              {icon ? (
                <img
                  src={
                    iconMimeType
                      ? `data:${iconMimeType};base64,${icon}`
                      : `data:image/svg+xml;base64,${window.btoa(icon)}`
                  }
                  alt={filename}
                />
              ) : (
                <img src={shortcutImg} width={32} height={32} />
              )}
            </div>
          }
          hideShortcutBadge={flag('home.hide-shortcut-badge')}
        />
      ) : (
        <SquareAppIcon
          name={filename}
          variant={isLoading ? 'loading' : 'shortcut'}
          display={display}
          IconContent={isLoading ? null : undefined}
          description={description}
          hideShortcutBadge={flag('home.hide-shortcut-badge')}
        />
      )}
    </Link>
  )
}

export default ShortcutLink
