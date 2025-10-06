import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut, models } from 'cozy-client'
import flag from 'cozy-flags'

const {
  file: { splitFilename, getShortcutImgSrc }
} = models

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

  const shortcutImgSrc = getShortcutImgSrc(file)

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
      {shortcutImgSrc || shortcutImg ? (
        <SquareAppIcon
          name={filename}
          variant="shortcut"
          display={display}
          description={description}
          IconContent={
            <div className="u-w-2 u-h-2">
              {shortcutImgSrc ? (
                <img src={shortcutImgSrc} alt={filename} />
              ) : (
                <img
                  className="u-bdrs-5"
                  src={shortcutImg}
                  width={32}
                  height={32}
                />
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
