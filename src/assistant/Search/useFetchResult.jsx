import { useEffect, useState } from 'react'

import Minilog from 'cozy-minilog'

import { useDataProxy } from 'dataproxy/DataProxyProvider'

import { getIconForSearchResult } from './getIconForSearchResult'

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
        // Begin Retrocompatibility code, to be removed when following PR is merged: https://github.com/cozy/cozy-web-data-proxy/pull/10
        r.slug = r.slug || r.type
        r.subTitle = r.subTitle || r.name
        // End Retrocompatibility code
        const icon = getIconForSearchResult(r)
        return {
          id: r.doc._id,
          icon: icon,
          primary: r.title,
          secondary: r.subTitle,
          onClick: () => {
            window.open(r.url)
          }
        }
      })

      setState({ isLoading: false, results, searchValue })
    }

    if (searchValue) {
      if (searchValue !== state.searchValue) {
        fetch(searchValue)
      }
    } else {
      setState({ isLoading: true, results: null, searchValue: null })
    }
  }, [dataProxy, searchValue, state.searchValue, setState])

  return {
    isLoading: state.isLoading,
    results: state.results
  }
}
