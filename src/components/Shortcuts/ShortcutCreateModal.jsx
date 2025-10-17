import React from 'react'

import { useClient } from 'cozy-client'

import { ShortcutDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useMagicFolder } from '@/components/Sections/hooks/useMagicFolder'

const ShortcutCreateModal = ({ onClose }) => {
  const client = useClient()
  const magicHomeFolderId = useMagicFolder()

  const createShortcut = async (makedFileName, makedURL) => {
    await client.save({
      _type: 'io.cozy.files.shortcuts',
      dir_id: magicHomeFolderId,
      name: makedFileName,
      url: makedURL
    })
  }

  return <ShortcutDialog onSave={createShortcut} onClose={onClose} />
}

export default ShortcutCreateModal
