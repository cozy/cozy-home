import {
  divider,
  makeActions
} from 'cozy-ui/transpiled/react/ActionsMenu/Actions'

import { DisplayMode } from 'components/Sections/SectionsTypes'
import { displayModeAction } from 'components/Sections/actions/displayModeAction'
import { groupModeAction } from 'components/Sections/actions/groupModeAction'

const actionArray = [
  displayModeAction(DisplayMode.COMPACT),
  displayModeAction(DisplayMode.DETAILED),
  divider,
  groupModeAction()
]

export const actions = makeActions(actionArray)
