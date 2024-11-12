import React from 'react'

import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

import SearchBar from './Search/SearchBar'
import SearchProvider from './Search/SearchProvider'
import AssistantProvider from './AssistantProvider'

const AssistantWrapperDesktop = () => {
  return (
    <CozyTheme variant="normal">
      <div className="app-list-wrapper u-mb-3 u-mh-auto u-w-100">
        <AssistantProvider>
          <SearchProvider>
            <SearchBar />
          </SearchProvider>
        </AssistantProvider>
      </div>
    </CozyTheme>
  )
}

export default AssistantWrapperDesktop
