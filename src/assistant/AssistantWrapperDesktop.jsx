import React from 'react'

import SearchBar from './Search/SearchBar'
import SearchProvider from './Search/SearchProvider'

const AssistantWrapperDesktop = () => {
  return (
    <div className="app-list-wrapper u-mb-3 u-mh-auto u-w-100">
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    </div>
  )
}

export default AssistantWrapperDesktop
