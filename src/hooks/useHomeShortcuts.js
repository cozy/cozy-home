import { useState, useEffect } from 'react'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import get from 'lodash/get'
import { mkHomeMagicFolderConn, mkHomeShorcutsConn } from 'queries'

const useHomeShortcuts = () => {
  const client = useClient()
  const { t } = useI18n()
  const [files, setFiles] = useState([])

  useEffect(() => {
    const load = async () => {
      const homeMagicFolderConn = mkHomeMagicFolderConn(t)
      const folder = await client.query(
        homeMagicFolderConn.query,
        homeMagicFolderConn
      )
      const folderId = get(folder, 'data[0]._id')

      if (folderId) {
        const homeShortcutsConn = mkHomeShorcutsConn(folderId)
        const { data } = await client.query(
          homeShortcutsConn.query,
          homeShortcutsConn
        )
        setFiles(data)
      }
    }
    load()
  }, [client, t])

  return files
}

export default useHomeShortcuts
