import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { useAssistant } from '../AssistantProvider'
import ResultMenuContent from '../ResultMenu/ResultMenuContent'
import { useSearch } from '../Search/SearchProvider'
import SearchBar from '../Search/SearchBar'

const SearchDialog = () => {
  const { onAssistantExecute } = useAssistant()
  const navigate = useNavigate()
  const { searchValue, clearSearch } = useSearch()

  const handleClick = () => {
    onAssistantExecute(searchValue)
    clearSearch()
    navigate('../assistant', { replace: true })
  }

  const handleClose = () => {
    clearSearch()
    navigate('..')
  }

  return (
    <FixedDialog
      open
      fullScreen
      size="full"
      disableGutters
      componentsProps={{
        dialogTitle: { className: 'u-ph-half u-mt-3' },
        divider: { className: 'u-dn' }
      }}
      title={<SearchBar />}
      content={
        searchValue !== '' && <ResultMenuContent onClick={handleClick} />
      }
      onClose={handleClose}
    />
  )
}

export default SearchDialog
