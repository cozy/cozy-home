import { useEffect, useState } from 'react'

import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import ContactsIcon from 'cozy-ui/transpiled/react/Icons/Contacts'
import FileTypeTextIcon from 'cozy-ui/transpiled/react/Icons/FileTypeText'
import FileTypeNoteIcon from 'cozy-ui/transpiled/react/Icons/FileTypeNote'
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

const getIconForSearchResult = (searchResult) => {
  console.log('getIconForSearchResult', searchResult)
  if (searchResult.type === 'notes') {
    return {
      type: 'component',
      component: FileTypeNoteIcon
    }
  }

  if (searchResult.type === 'drive') {
    if (searchResult.doc.type === 'directory') {
      return {
        type: 'component',
        component: FileTypeFolderIcon
      }
    }

    return {
      type: 'component',
      component: FileTypeTextIcon
    }
  }

  if (searchResult.type === 'contacts') {
    return {
      type: 'component',
      component: ContactsIcon
    }
  }

  if (searchResult.doc.type === 'io.cozy.apps') {
    console.log('APP', searchResult)
    return {
      type: 'app',
      app: searchResult.doc
    }
  }

  return {
    type: 'unknown'
  }
}
