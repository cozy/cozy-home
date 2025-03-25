import React from 'react'

import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

import { AssistantDesktop } from 'cozy-search'

export const AssistantDesktopWrapper = () => {
  return (
    <CozyTheme variant="normal">
      <div className="app-list-wrapper u-mh-auto u-mb-3">
        <AssistantDesktop
          componentsProps={{
            SearchBarDesktop: {
              elevation: true,
              hasHalfBorderRadius: true
            }
          }}
        />
      </div>
    </CozyTheme>
  )
}

export default AssistantDesktopWrapper
