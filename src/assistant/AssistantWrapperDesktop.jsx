import React from 'react'
import flag from 'cozy-flags'

import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import SearchBar from './Search/SearchBar'

const AssistantWrapperDesktop = () => {
  const { isMobile } = useBreakpoints()

  if (!flag('cozy.assistant.enabled') || isMobile) return null

  return (
    <div className="app-list-wrapper u-mb-3 u-mh-auto u-w-100">
      <SearchBar />
    </div>
  )
}

export default AssistantWrapperDesktop
