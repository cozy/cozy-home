import { makeAction } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/makeAction'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'

export const deleteShortcut = ({ file, client, t }) => {
  const label = t('shortcut.delete')

  return makeAction({
    name: 'DeleteShortcut',
    icon: TrashIcon,
    label,
    action: () => {
      client.collection('io.cozy.files').deleteFilePermanently(file._id)
    }
  })
}
