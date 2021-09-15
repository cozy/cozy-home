import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut } from 'cozy-client'
import { CozyFile } from 'cozy-doctypes'

import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Link from 'cozy-ui/transpiled/react/Link'
import InfosBadge from 'cozy-ui/transpiled/react/InfosBadge'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LinkOut from 'cozy-ui/transpiled/react/Icons/LinkOut'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const ShortcutLink = ({ file, desktopSize = 32 }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { shortcutInfos } = useFetchShortcut(client, file._id)

  const { filename } = CozyFile.splitFilename(file)
  const url = get(shortcutInfos, 'data.attributes.url', '#')
  const shortcutIcon = get(shortcutInfos, 'data.attributes.metadata.icon')
  const computedSize = isMobile ? 32 : desktopSize

  return (
    <Link
      underline="none"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="item"
    >
      <InfosBadge
        badgeContent={
          <Icon icon={LinkOut} size={10} color={'var(--secondaryTextColor)'} />
        }
        className="item-icon"
      >
        {shortcutIcon ? (
          <img
            src={`data:image/svg+xml;base64,${window.btoa(shortcutIcon)}`}
            width={computedSize}
            height={computedSize}
            alt={filename}
          />
        ) : (
          <Avatar
            size={computedSize}
            text={filename.charAt(0).toUpperCase()}
            className="bdrs-4"
          />
        )}
      </InfosBadge>

      <Typography variant="h3" className="item-title">
        {filename}
      </Typography>
    </Link>
  )
}

export default ShortcutLink
