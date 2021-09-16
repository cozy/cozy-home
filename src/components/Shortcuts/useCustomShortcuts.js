import { useEffect, useState } from 'react'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import logger from 'cozy-logger'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import {
  mkHomeMagicFolderConn,
  mkHomeCustomShorcutsConn,
  mkHomeCustomShorcutsDirConn
} from 'queries'
import { formatShortcuts } from './utils'

export const useCustomShortcuts = () => {
  const client = useClient()
  const { t } = useI18n()
  const [shortcutsDirectories, setDirectories] = useState()
  const abort = () => setDirectories(null)

  useEffect(() => {
    const load = async () => {
      try {
        const homeMagicFolderConn = mkHomeMagicFolderConn(t)
        const folder = await client.query(
          homeMagicFolderConn.query,
          homeMagicFolderConn
        )

        if (!folder) return abort()

        const homeShortcutsDirConn = mkHomeCustomShorcutsDirConn({
          currentFolderId: get(folder, 'data[0]._id')
        })
        const { data: folders } = await client.query(
          homeShortcutsDirConn.query,
          homeShortcutsDirConn
        )

        if (!folders || folders.length === 0) return abort()

        const homeShortcutsConn = mkHomeCustomShorcutsConn(
          folders.map(folder => folder._id)
        )
        const { data: shortcuts } = await client.query(
          homeShortcutsConn.query,
          homeShortcutsConn
        )

        if (!shortcuts || shortcuts.length === 0) return abort()

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
