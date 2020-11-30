import React from 'react'
import { useClient, useFetchShortcut } from 'cozy-client'
import get from 'lodash/get'
import Icon from 'cozy-ui/transpiled/react/Icon'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { CozyFile } from 'cozy-doctypes'

import DeviceBrowserIcon from 'cozy-ui/transpiled/react/Icons/DeviceBrowser'

const ShortcutTile = ({ file }) => {
  const client = useClient()
  const { shortcutInfos } = useFetchShortcut(client, file._id)
  const url = get(shortcutInfos, 'data.attributes.url', '#')
  const shortcurtIcon = get(shortcutInfos, 'data.attributes.metadata.icon')
  const { filename } = CozyFile.splitFilename(file)
  const { isMobile } = useBreakpoints()

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="item">
      <div className="item-icon">
        {shortcurtIcon ? (
          <img
            src={`data:image/svg+xml;base64,${btoa(shortcurtIcon)}`}
            width="100%"
            alt=""
          />
        ) : (
          <Icon
            icon={DeviceBrowserIcon}
            size={isMobile ? 32 : 40}
            color="var(--charcoalGrey)"
          />
        )}
      </div>
      <h3 className="item-title">{filename}</h3>
    </a>
  )
}

export default ShortcutTile
