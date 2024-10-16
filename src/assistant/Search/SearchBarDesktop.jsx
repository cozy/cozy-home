import React, { useRef } from 'react'

import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AssistantIcon from 'assets/images/icon-assistant.png'

import ResultMenu from '../ResultMenu/ResultMenu'
import { useSearch } from './SearchProvider'

import styles from './styles.styl'

const SearchBarDesktop = ({ value, onClick, onKeyDown, onChange }) => {
  const { t } = useI18n()
  const { searchValue } = useSearch()
  const searchRef = useRef()

  return (
    <>
      <SearchBar
        className={searchValue ? styles['searchBarDesktop--result'] : ''}
        ref={searchRef}
        size="large"
        icon={<Icon className="u-mh-1" icon={AssistantIcon} size={32} />}
        placeholder={t('assistant.search.placeholder')}
        value={value}
        componentsProps={{
          inputBase: { onKeyDown }
        }}
        disabledClear
        disabledFocus={value !== ''}
        onChange={onChange}
      />
      {searchValue && <ResultMenu anchorRef={searchRef} onClick={onClick} />}
    </>
  )
}

export default SearchBarDesktop
