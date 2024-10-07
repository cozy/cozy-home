import { useEffect, useState } from 'react'

import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import ContactsIcon from 'cozy-ui/transpiled/react/Icons/Contacts'

export const useFetchResult = searchValue => {
  const [state, setState] = useState({
    isLoading: true,
    results: null,
    searchValue: null
  })

  useEffect(() => {
    const fetch = async searchValue => {
      setState({ isLoading: true, results: null, searchValue })

      const results = await new Promise(resolve =>
        setTimeout(
          () =>
            resolve([
              {
                icon: FileTypeFolderIcon,
                primary: 'Axa',
                secondary: '/Adminisitratif/',
                onClick: () => {}
              },
              {
                icon: FileTypeFolderIcon,
                primary: 'Axa',
                secondary: '/Adminisitratif/',
                onClick: () => {}
              },
              {
                icon: ContactsIcon,
                primary: 'Conseiller AXA',
                secondary: '0475361254',
                onClick: () => {}
              },
              {
                icon: ContactsIcon,
                primary: 'Conseiller AXA',
                secondary: '0475361254',
                onClick: () => {}
              },
              {
                icon: FileTypeFolderIcon,
                primary: 'Axa',
                secondary: '/Adminisitratif/',
                onClick: () => {}
              },
              {
                icon: FileTypeFolderIcon,
                primary: 'Axa',
                secondary: '/Adminisitratif/',
                onClick: () => {}
              },
              {
                icon: ContactsIcon,
                primary: 'Conseiller AXA',
                secondary: '0475361254',
                onClick: () => {}
              },
              {
                icon: ContactsIcon,
                primary: 'Conseiller AXA',
                secondary: '0475361254',
                onClick: () => {}
              }
            ]),
          500
        )
      )

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
