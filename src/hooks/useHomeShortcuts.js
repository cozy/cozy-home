import { useState, useEffect } from 'react'
import { Q, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/react/I18n'
import get from 'lodash/get'

const useHomeShortcuts = () => {
  const client = useClient()
  const { t } = useI18n()
  const [files, setFiles] = useState([])

  useEffect(() => {
    const load = async () => {
      const folder = await client.query(
        Q('io.cozy.files').where({ path: t('home_config_magic_folder') })
      )
      const folderId = get(folder, 'data[0]._id')

      if (folderId) {
        const { data } = await client.query(
          Q('io.cozy.files').where({ dir_id: folderId, class: 'shortcut' })
        )
        setFiles(data)
      }
    }
    load()
  }, [client, t])

  return files
}

export default useHomeShortcuts
