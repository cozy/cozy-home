import React from 'react'

import { useClient } from 'cozy-client'

import CozyTheme from 'cozy-ui-plus/dist/providers/CozyTheme'
import { ShortcutDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useMagicFolder } from '@/components/Sections/hooks/useMagicFolder'

const ShortcutEditModal = ({ file, shortcutInfos, onClose }) => {
  const client = useClient()
  const magicHomeFolderId = useMagicFolder()

  const { data: shortcutData } = shortcutInfos

  const onSave = async (makedFileName, makedURL) => {
    // There is no route to edit a shortcut. It is easier to delete and create a new one
    // because shortcut must have a special file content.
    await client.collection('io.cozy.files').deleteFilePermanently(file._id)

    await client.save({
      _type: 'io.cozy.files.shortcuts',
      dir_id: magicHomeFolderId,
      name: makedFileName,
      url: makedURL
    })
  }

  return (
    <CozyTheme variant="normal">
      <ShortcutDialog
        shortcut={shortcutData}
        onSave={onSave}
        onClose={onClose}
      />
    </CozyTheme>
  )
}

export default ShortcutEditModal
