import React from 'react'

import flag from 'cozy-flags'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import AddTile from '@/components/AddTile'
import { useApps } from '@/components/Applications'
import AssistantTile from '@/components/AssistantTile'
import EntrypointLink from '@/components/EntrypointLink'
import LogoutTile from '@/components/LogoutTile'
import { useServices } from '@/components/Services'
import ShortcutLink from '@/components/ShortcutLink'

// Home tile list as it was before the folders feature. Rendered when the
// `home.apps.folders` flag is off, so the feature can ship dark.
export const LegacyApplicationsAndServices = () => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const { appsComponents, apps, shortcuts, entrypoints } = useApps()
  const { konnectors } = useServices()
  const { isMobile } = useBreakpoints()

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
        {isMobile && flag('cozy.assistant.legacy.enabled') && <AssistantTile />}
        <AddTile apps={apps} />
        {showLogout && <LogoutTile />}
      </div>
    </div>
  )
}

export default LegacyApplicationsAndServices
