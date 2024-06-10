import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut } from 'cozy-client'
import { CozyFile } from 'cozy-doctypes'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Link from 'cozy-ui/transpiled/react/Link'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

export const ShortcutLink = ({
  display = 'compact',
  file,
  desktopSize = 44,
  ...props
}) => {
  const client = useClient()
  // We only need this call to useFetchShortcut in order to
  // get the URL of the shortcut. For the rest of the information
  // like the icon or iconType, we already have the informations
  // within the file. So let's use these informations instead of
  // waiting an http request to resolve.
  const { shortcutInfos } = useFetchShortcut(client, file._id)
  const { isMobile } = useBreakpoints()
  const computedSize = isMobile ? 32 : desktopSize

  const { filename } = CozyFile.splitFilename(file)
  const url = get(shortcutInfos, 'data.attributes.url', '#')

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
      {icon ? (
        <SquareAppIcon
          name={filename}
          variant="shortcut"
          display={display}
          description={description}
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
        <SquareAppIcon
          name={filename}
          variant="shortcut"
          display={display}
          description={description}
        />
      )}
    </Link>
  )
}

export default ShortcutLink
