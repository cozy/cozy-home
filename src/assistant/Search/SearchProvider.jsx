import React, { useMemo, useContext, useState, useCallback } from 'react'
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
  const [selectedIndex, setSelectedIndex] = useState()
  const { isLoading, results } = useFetchResult(searchValue)

  const delayedSetSearchValue = useMemo(
    () => debounce(setSearchValue, 250),
    [setSearchValue]
  )

  const clearSearch = useCallback(() => {
    setSearchValue('')
    setSelectedIndex()
  }, [])

  const value = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      delayedSetSearchValue,
      isLoading,
      clearSearch,
      selectedIndex,
      setSelectedIndex,
      results
    }),
    [
      searchValue,
      delayedSetSearchValue,
      isLoading,
      clearSearch,
      selectedIndex,
      results
    ]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export default React.memo(SearchProvider)
