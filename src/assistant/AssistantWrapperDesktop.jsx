import React from 'react'

import SearchBar from './Search/SearchBar'
import SearchProvider from './Search/SearchProvider'
import AssistantProvider from './AssistantProvider'

const AssistantWrapperDesktop = () => {
  return (
    <div className="app-list-wrapper u-mb-3 u-mh-auto u-w-100">
      <AssistantProvider>
        <SearchProvider>
          <SearchBar />
        </SearchProvider>
      </AssistantProvider>
    </div>
  )
}

export default AssistantWrapperDesktop
