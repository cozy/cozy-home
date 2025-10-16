import React, { useState } from 'react'
import get from 'lodash/get'
import { useOnLongPress } from 'rooks'

import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useClient, useFetchShortcut, models } from 'cozy-client'
import flag from 'cozy-flags'
import ShortcutActionsMenu from './Shortcuts/ShortcutActionsMenu'

const {
  file: { splitFilename, getShortcutImgSrc }
} = models

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Badge from 'cozy-ui/transpiled/react/Badge'
import Link from 'cozy-ui/transpiled/react/Link'

export const ShortcutLink = ({ display = 'compact', file, ...props }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()

  const { shortcutInfos, shortcutImg, fetchStatus } = useFetchShortcut(
    client,
    file._id
  )
  const isLoading = fetchStatus === 'loading'

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const longPressRef = useOnLongPress(() => {
    if (!isMobile) {
      return
    }
    setIsMenuOpen(true)
  })

  const { filename } = splitFilename(file)
  const url = get(shortcutInfos, 'data.url', '#')

  const shortcutImgSrc = getShortcutImgSrc(file)

  const description = get(file, 'attributes.metadata.description')

  return (
    <Badge
      badgeContent={
        <ShortcutActionsMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          file={file}
          shortcutInfos={shortcutInfos}
        />
      }
      withBorder={false}
      size="large"
      overlap="rectangular"
    >
      <Link
        ref={longPressRef}
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
    </Badge>
  )
}

export default ShortcutLink
