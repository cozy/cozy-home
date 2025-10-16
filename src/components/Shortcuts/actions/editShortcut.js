import { makeAction } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/makeAction'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'

export const editShortcut = ({ showEditModal, t }) => {
  const label = t('shortcut.edit')

  return makeAction({
    name: 'EditShortcut',
    icon: PenIcon,
    label,
    action: () => {
      showEditModal()
    }
  })
}
