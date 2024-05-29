import {
  divider,
  makeActions
} from 'cozy-ui/transpiled/react/ActionsMenu/Actions'

import { DisplayMode } from 'components/Sections/SectionsTypes'
import { displayModeAction } from './actions/displayModeAction'
import { groupModeAction } from './actions/groupModeAction'

const actionArray = [
  displayModeAction(DisplayMode.COMPACT),
  displayModeAction(DisplayMode.DETAILED),
  divider,
  groupModeAction()
]

export const actions = makeActions(actionArray)
