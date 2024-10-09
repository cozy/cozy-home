import { useEffect, useState } from 'react'

import { useDataProxy } from '../dataproxy/DataProxyProvider'
import { getIconForSearchResult } from './ResultMenu/getIconForSearchResult'

export const useFetchResult = searchValue => {
  const [state, setState] = useState({
    isLoading: true,
    results: null,
    searchValue: null
  })
  const dataProxy = useDataProxy()

  useEffect(() => {
    const fetch = async searchValue => {
      const result = await dataProxy.search(searchValue)

      console.log('SEARCH RESULT FROM FETCH', result)
      setState({ isLoading: true, results: null, searchValue })

      const results = result.map(r => {
        const icon = getIconForSearchResult(r)
        return {
          icon: icon,
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
