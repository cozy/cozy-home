import React from 'react'

import flag from 'cozy-flags'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import LogoutTile from 'components/LogoutTile'
import ShortcutLink from 'components/ShortcutLink'

import { useApps } from './Applications'
import { useServices } from './Services'
import AssistantTile from './AssistantTile'
import AddTile from './AddTile'

export const ApplicationsAndServices = () => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const { apps, shortcuts } = useApps()
  const { konnectors } = useServices()
  const { isMobile } = useBreakpoints()

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <div className="app-list app-list--gutter u-w-100 u-mh-auto u-flex-justify-center">
        {apps}
        {konnectors}
        {shortcuts &&
          shortcuts.map((shortcut, index) => (
            <ShortcutLink key={index} file={shortcut} />
          ))}
        {isMobile && <AssistantTile />}
        {<AddTile />}
        {showLogout && <LogoutTile />}
      </div>
    </div>
  )
}

export default ApplicationsAndServices
