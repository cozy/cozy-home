import React from 'react'

import flag from 'cozy-flags'
import List from 'cozy-ui/transpiled/react/List'
import Circle from 'cozy-ui/transpiled/react/Circle'
import PaperplaneIcon from 'cozy-ui/transpiled/react/Icons/Paperplane'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListItemSkeleton'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { useSearch } from '../Search/SearchProvider'
import ResultMenuItem from './ResultMenuItem'

const SearchResult = () => {
  const { isLoading, results } = useSearch()

  if (isLoading)
    return (
      <>
        <ListItemSkeleton hasSecondary />
        <ListItemSkeleton hasSecondary />
        <ListItemSkeleton hasSecondary />
      </>
    )

  return results.map((result, idx) => (
    <ResultMenuItem
      key={idx}
      icon={<Icon icon={result.icon} size={32} />}
      primaryText={result.primary}
      secondaryText={result.secondary}
      onClick={result.onClick}
    />
  ))
}

const ResultMenuContent = ({ onClick }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { searchValue } = useSearch()

  return (
    <List>
      <ResultMenuItem
        icon={
          <Circle size="small">
            <Icon icon={PaperplaneIcon} size={isMobile ? 12 : undefined} />
          </Circle>
        }
        primaryText={searchValue}
        secondaryText={t('assistant.search.result')}
        onClick={onClick}
      />
      {flag('cozy.assistant.withSearchResult') && <SearchResult />}
    </List>
  )
}

export default ResultMenuContent
