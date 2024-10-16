import React, { useRef } from 'react'

import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'

import SuggestionsPlaceholder from '../Conversations/SuggestionsPlaceholder'

import styles from '../Conversations/styles.styl'

const SearchBarMobile = ({ value, onClear, onChange }) => {
  const inputRef = useRef()

  // to adjust input height for multiline when typing in it
  useEventListener(inputRef.current, 'input', () => {
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  })

  const handleClear = () => {
    onClear()
    inputRef.current.style.height = 'auto'
  }

  return (
    <SearchBar
      className={styles['conversationBar']}
      size="auto"
      icon={null}
      placeholder=" "
      value={value}
      componentsProps={{
        inputBase: {
          inputProps: {
            className: styles['conversationBar-input']
          },
          inputRef: inputRef,
          autoFocus: true,
          rows: 1,
          multiline: true,
          startAdornment: !value && <SuggestionsPlaceholder />
        }
      }}
      onChange={onChange}
      onClear={handleClear}
    />
  )
}

export default SearchBarMobile
