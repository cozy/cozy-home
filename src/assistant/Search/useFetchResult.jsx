import { useEffect, useState } from 'react'

import Minilog from 'cozy-minilog'
import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import ContactsIcon from 'cozy-ui/transpiled/react/Icons/Contacts'

import { useDataProxy } from 'dataproxy/DataProxyProvider'

const log = Minilog('🔍 [useFetchResult]')

export const useFetchResult = searchValue => {
  const [state, setState] = useState({
    isLoading: true,
    results: null,
    searchValue: null
  })
  const dataProxy = useDataProxy()

  useEffect(() => {
    const fetch = async searchValue => {
      if (!dataProxy.dataProxyServicesAvailable) {
        log.log('DataProxy services are not available. Skipping search...')
        return
      }

      setState({ isLoading: true, results: null, searchValue })

      const searchResults = await dataProxy.search(searchValue)

      const results = searchResults.map(r => {
        return {
          icon: r.type === 'file' ? FileTypeFolderIcon : ContactsIcon,
          primary: r.title,
          secondary: r.name,
          onClick: () => {
            window.open(r.url)
          }
        }
      })

      setState({ isLoading: false, results, searchValue })
    }

    if (searchValue) {
      // !state.results below is a quick fix condition to avoid triggering the skeleton at each search. Don't know if it's the best approach, we should maybe remove it when working on the search correctly
      if (searchValue !== state.searchValue && !state.results) {
        fetch(searchValue)
      }
    } else {
      setState({ isLoading: true, results: null, searchValue: null })
    }
  }, [dataProxy, searchValue, state.searchValue, state.results, setState])

  return {
    isLoading: state.isLoading,
    results: state.results
  }
}
