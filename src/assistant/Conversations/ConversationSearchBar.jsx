import React, { useState, useRef } from 'react'
import { useTimeoutWhen } from 'rooks'

import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import Circle from 'cozy-ui/transpiled/react/Circle'
import ArrowUpIcon from 'cozy-ui/transpiled/react/Icons/ArrowUp'
import CrossMediumIcon from 'cozy-ui/transpiled/react/Icons/CrossMedium'
import ButtonBase from 'cozy-ui/transpiled/react/ButtonBase'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'

import ResultMenu from '../ResultMenu/ResultMenu'
import { useAssistant } from '../AssistantProvider'
import { useSearch } from '../SearchProvider'
import SuggestionsPlaceholder from './SuggestionsPlaceholder'

import styles from './styles.styl'

const ConversationSearchBar = ({
  assistantStatus,
  conversationId,
  autoFocus,
  hasArrowDown,
  onClose
}) => {
  const { t } = useI18n()
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
                <ButtonBase
                  className="u-bdrs-circle u-mr-half"
                  onClick={handleStop}
                >
                  <Circle size="small">
                    <Icon icon={CrossMediumIcon} size={12} />
                  </Circle>
                </ButtonBase>
              ) : (
                <ButtonBase
                  className="u-bdrs-circle u-mr-half"
                  onClick={handleClick}
                >
                  <Circle
                    size="small"
                    backgroundColor={
                      inputValue
                        ? 'var(--primaryColor)'
                        : 'var(--actionColorDisabledBackground)'
                    }
                  >
                    <Icon
                      icon={ArrowUpIcon}
                      rotate={hasArrowDown ? 180 : 0}
                      size={12}
                      color={
                        inputValue
                          ? 'var(--primaryContrastTextColor)'
                          : 'var(--disabledTextColor)'
                      }
                    />
                  </Circle>
                </ButtonBase>
              ),
            onKeyDown: ev => {
              if (ev.key === 'Enter') {
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
