import { useEffect, useState } from 'react'

import { useClient } from 'cozy-client'
import logger from 'cozy-logger'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  mkHomeMagicFolderConn,
  mkHomeCustomShorcutsConn,
  mkHomeCustomShorcutsDirConn
} from 'queries'
import { formatShortcuts } from './utils'

export const useCustomShortcuts = () => {
  const client = useClient()
  const { t } = useI18n()
  const [shortcutsDirectories, setDirectories] = useState(undefined)
  const abort = () => setDirectories(null)

  useEffect(() => {
    const load = async () => {
      try {
        // Get the magic dir
        const homeMagicFolderConn = mkHomeMagicFolderConn(t)
        const { data: magicFolder } = await client.query(
          homeMagicFolderConn.query,
          homeMagicFolderConn
        )

        if (!magicFolder || magicFolder.length === 0) return abort()

        // Get all shortcuts directories inside the magic dir
        const homeShortcutsDirConn = mkHomeCustomShorcutsDirConn({
          currentFolderId: magicFolder[0]._id
        })
        const { data: folders } = await client.query(
          homeShortcutsDirConn.query,
          homeShortcutsDirConn
        )

        if (!folders || folders.length === 0) return abort()

        // Get all shortcuts items inside those shortcuts directories
        const homeShortcutsConn = mkHomeCustomShorcutsConn(
          folders.map(folder => folder._id)
        )
        const { data: shortcuts } = await client.query(
          homeShortcutsConn.query,
          homeShortcutsConn
        )

        if (!shortcuts || shortcuts.length === 0) return abort()

        // Merge directories and shortcuts into an object that the view can process
        setDirectories(formatShortcuts(folders, shortcuts))
      } catch (error) {
        logger.error(error)
        abort()
      }
    }

    load()
  }, [client, t])

  return { shortcutsDirectories }
}

export default useCustomShortcuts
