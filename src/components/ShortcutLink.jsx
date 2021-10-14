import React from 'react'
import get from 'lodash/get'

import { useClient, useFetchShortcut } from 'cozy-client'
import { CozyFile } from 'cozy-doctypes'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Link from 'cozy-ui/transpiled/react/Link'

export const ShortcutLink = ({ file }) => {
  const client = useClient()
  const { shortcutInfos } = useFetchShortcut(client, file._id)

  const { filename } = CozyFile.splitFilename(file)
  const url = get(shortcutInfos, 'data.attributes.url', '#')

  return (
    <Link
      underline="none"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="item"
    >
      <SquareAppIcon name={filename} variant="shortcut" />
    </Link>
  )
}

export default ShortcutLink
