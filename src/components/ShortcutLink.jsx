import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut } from 'cozy-client'
import { CozyFile } from 'cozy-doctypes'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Link from 'cozy-ui/transpiled/react/Link'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

export const ShortcutLink = ({ file, desktopSize = 44 }) => {
  const client = useClient()
  const { shortcutInfos } = useFetchShortcut(client, file._id)
  const { isMobile } = useBreakpoints()
  const computedSize = isMobile ? 32 : desktopSize

  const { filename } = CozyFile.splitFilename(file)
  const url = get(shortcutInfos, 'data.attributes.url', '#')

  /**
   * If we don't have iconMimeType, we consider that the icon is a binary svg.
   * Otherwise we consider that the icon comes from Iconizer api so it is in base64 directly.
   */
  const icon = get(shortcutInfos, 'data.attributes.metadata.icon')
  const iconMimeType = get(
    shortcutInfos,
    'data.attributes.metadata.iconMimeType'
  )

  return (
    <Link
      underline="none"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="scale-hover"
    >
      {icon ? (
        <SquareAppIcon
          name={filename}
          variant="shortcut"
          IconContent={
            <img
              src={
                iconMimeType
                  ? `data:${iconMimeType};base64,${icon}`
                  : `data:image/svg+xml;base64,${window.btoa(icon)}`
              }
              width={computedSize}
              height={computedSize}
              alt={filename}
            />
          }
        />
      ) : (
        <SquareAppIcon name={filename} variant="shortcut" />
      )}
    </Link>
  )
}

export default ShortcutLink
