import React from 'react'

import flag from 'cozy-flags'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import LogoutTile from '@/components/LogoutTile'
import ShortcutLink from '@/components/ShortcutLink'
import EntrypointLink from '@/components/EntrypointLink'

import { useApps } from './Applications'
import { useServices } from './Services'
import AssistantTile from './AssistantTile'
import AddTile from './AddTile'

export const ApplicationsAndServices = () => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const { appsComponents, apps, shortcuts, entrypoints } = useApps()
  const { konnectors } = useServices()
  const { isMobile } = useBreakpoints()

  const hiddenApps = flag('apps.hidden') || []
  const isStoreAvailable =
    apps.find(({ slug }) => slug === 'store') && !hiddenApps.includes('store')

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <div className="app-list app-list--gutter u-w-100 u-mh-auto u-flex-justify-center">
        {appsComponents}
        {konnectors}
        {shortcuts &&
          shortcuts.map((shortcut, index) => (
            <ShortcutLink key={index} file={shortcut} />
          ))}
        {entrypoints &&
          entrypoints.map(entrypoint => (
            <EntrypointLink key={entrypoint.name} entrypoint={entrypoint} />
          ))}
        {isMobile && flag('cozy.assistant.enabled') && <AssistantTile />}
        {isStoreAvailable && <AddTile />}
        {showLogout && <LogoutTile />}
      </div>
    </div>
  )
}

export default ApplicationsAndServices
