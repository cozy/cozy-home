import React, { useState, useRef } from 'react'
import { useTimeoutWhen } from 'rooks'

import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import PaperplaneIcon from 'cozy-ui/transpiled/react/Icons/Paperplane'
import StopIcon from 'cozy-ui/transpiled/react/Icons/Stop'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Button from 'cozy-ui/transpiled/react/Buttons'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import ResultMenu from '../ResultMenu/ResultMenu'
import { useAssistant } from '../AssistantProvider'
import { useSearch } from '../SearchProvider'
import SuggestionsPlaceholder from './SuggestionsPlaceholder'

import styles from './styles.styl'

const ConversationSearchBar = ({
  assistantStatus,
  conversationId,
  autoFocus,
  onClose
}) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { assistantState, onAssistantExecute } = useAssistant()
  const { setSearchValue, delayedSetSearchValue } = useSearch()
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef()

  useTimeoutWhen(
    () => setShowSuggestions(true),
    2000,
    inputValue === '' && !assistantState.conversationId
  )

  useEventListener(inputRef.current, 'input', () => {
    // TODO: hack found on internet, we could try remove the auto assignment to see if it still works without it
    inputRef.current.style.height = 'auto'
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  })

  const handleChange = ev => {
    delayedSetSearchValue(ev.target.value)
    setInputValue(ev.target.value)
    setShowSuggestions(false)
  }

  const handleStop = () => {
    // not supported right now
    return
  }

  const handleClick = () =>
    onAssistantExecute(inputValue, () => {
      setInputValue('')
      setSearchValue('')
      setShowSuggestions(false)
      inputRef.current.style.height = 'auto'
    })

  return (
    <div className="u-w-100 u-maw-7 u-mh-auto">
      <SearchBar
        className={styles['conversationSearchBar']}
        icon={null}
        size="auto"
        placeholder={showSuggestions ? ' ' : t('assistant.search.placeholder')}
        value={inputValue}
        disabledClear
        componentsProps={{
          inputBase: {
            inputRef: inputRef,
            className: 'u-pv-0',
            rows: 1,
            multiline: true,
            inputProps: {
              className: styles['conversationSearchBar-input']
            },
            autoFocus,
            startAdornment: showSuggestions && (
              <SuggestionsPlaceholder inputValue={inputValue} />
            ),
            endAdornment:
              assistantStatus !== 'idle' ? (
                <IconButton className="u-p-half" onClick={handleStop}>
                  <Button
                    component="div"
                    className="u-miw-auto u-w-2 u-h-2 u-bdrs-circle"
                    classes={{ label: 'u-flex u-w-auto' }}
                    label={<Icon icon={StopIcon} size={12} />}
                  />
                </IconButton>
              ) : (
                <IconButton
                  className="u-p-half"
                  disabled={inputValue === ''}
                  onClick={handleClick}
                >
                  <Button
                    component="div"
                    className="u-miw-auto u-w-2 u-h-2 u-bdrs-circle"
                    classes={{ label: 'u-flex u-w-auto' }}
                    label={<Icon icon={PaperplaneIcon} />}
                    disabled={inputValue === ''}
                  />
                </IconButton>
              ),
            onKeyDown: ev => {
              if (!isMobile && ev.key === 'Enter') {
                ev.preventDefault() // prevent form submit
                handleClick()
              }
            }
          }
        }}
        onChange={handleChange}
      />
      {!conversationId && (
        <ResultMenu onClick={handleClick} onClose={onClose} />
      )}
    </div>
  )
}

export default ConversationSearchBar
