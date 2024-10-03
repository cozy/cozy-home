import React, { useMemo, useContext, useState } from 'react'
import debounce from 'lodash/debounce'

import { useFetchResult } from './useFetchResult'

export const SearchContext = React.createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  const { isLoading, results } = useFetchResult(searchValue)

  const delayedSetSearchValue = useMemo(
    () => debounce(setSearchValue, 375),
    [setSearchValue]
  )

  const value = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      delayedSetSearchValue,
      isLoading,
      results
    }),
    [searchValue, delayedSetSearchValue, isLoading, results]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export default React.memo(SearchProvider)
