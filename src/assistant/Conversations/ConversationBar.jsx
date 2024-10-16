import React, { useState, useRef } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import PaperplaneIcon from 'cozy-ui/transpiled/react/Icons/Paperplane'
import StopIcon from 'cozy-ui/transpiled/react/Icons/Stop'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Button from 'cozy-ui/transpiled/react/Buttons'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useAssistant } from '../AssistantProvider'
import { useSearch } from '../Search/SearchProvider'

import styles from './styles.styl'

const ConversationBar = ({ assistantStatus }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { onAssistantExecute } = useAssistant()
  const { clearSearch, delayedSetSearchValue } = useSearch()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  // to adjust input height for multiline when typing in it
  useEventListener(inputRef.current, 'input', () => {
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  })

  const handleClear = () => {
    setInputValue('')
    clearSearch()
  }

  const handleChange = ev => {
    delayedSetSearchValue(ev.target.value)
    setInputValue(ev.target.value)
  }

  const handleStop = () => {
    // not supported right now
    return
  }

  const handleClick = () =>
    onAssistantExecute(inputValue, () => {
      handleClear()
      inputRef.current.style.height = 'auto'
    })

  return (
    <div className="u-w-100 u-maw-7 u-mh-auto">
      <SearchBar
        className={styles['conversationBar']}
        icon={null}
        size="auto"
        placeholder={t('assistant.search.placeholder')}
        value={inputValue}
        disabledClear
        componentsProps={{
          inputBase: {
            inputRef: inputRef,
            className: 'u-pv-0',
            rows: 1,
            multiline: true,
            inputProps: {
              className: styles['conversationBar-input']
            },
            autoFocus: !isMobile,
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
                  disabled={!inputValue}
                  onClick={handleClick}
                >
                  <Button
                    component="div"
                    className="u-miw-auto u-w-2 u-h-2 u-bdrs-circle"
                    classes={{ label: 'u-flex u-w-auto' }}
                    label={<Icon icon={PaperplaneIcon} />}
                    disabled={!inputValue}
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
    </div>
  )
}

export default ConversationBar
