import { useEffect, useState } from 'react'

import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import ContactsIcon from 'cozy-ui/transpiled/react/Icons/Contacts'
import { useDataProxy } from '../dataproxy/DataProxyProvider'

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
        return {
          icon: r.type === 'file' ? FileTypeFolderIcon : ContactsIcon,
          primary: r.title,
          secondary: r.name,
          onClick: () => { console.log('SELECTED', r.title)}
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
  }, [searchValue, state.searchValue, state.results, setState])

  return {
    isLoading: state.isLoading,
    results: state.results
  }
}
