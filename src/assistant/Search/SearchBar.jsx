import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { useSearch } from './SearchProvider'
import { useAssistant } from '../AssistantProvider'
import SearchBarMobile from './SearchBarMobile'
import SearchBarDesktop from './SearchBarDesktop'

const SearchBar = () => {
  const { isMobile } = useBreakpoints()
  const [inputValue, setInputValue] = useState('')
  const { setSearchValue, clearSearch, delayedSetSearchValue } = useSearch()
  const { onAssistantExecute } = useAssistant()
  const navigate = useNavigate()

  const handleClear = () => {
    setInputValue('')
    clearSearch()
  }

  const handleClick = () => {
    onAssistantExecute(inputValue)
    navigate('assistant')
    // setTimeout usefull to prevent the field from emptying before the route is changed
    // works because the modal appears on top of the view that carries the input and not instead of it.
    setTimeout(() => {
      handleClear()
    }, 100)
  }

  const handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault() // prevent form submit
      if (inputValue !== '') handleClick()
    }
  }

  const handleChange = ev => {
    if (ev.target.value === '') {
      setSearchValue(ev.target.value)
    } else {
      delayedSetSearchValue(ev.target.value)
    }
    setInputValue(ev.target.value)
  }

  if (isMobile) {
    return (
      <SearchBarMobile
        value={inputValue}
        onClear={handleClear}
        onChange={handleChange}
      />
    )
  }

  return (
    <SearchBarDesktop
      value={inputValue}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

export default SearchBar
