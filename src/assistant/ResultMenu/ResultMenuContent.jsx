import React from 'react'

import flag from 'cozy-flags'
import List from 'cozy-ui/transpiled/react/List'
import Circle from 'cozy-ui/transpiled/react/Circle'
import ArrowUpIcon from 'cozy-ui/transpiled/react/Icons/ArrowUp'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListItemSkeleton'

import { useSearch } from '../SearchProvider'
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
  const { searchValue } = useSearch()

  return (
    <List>
      <ResultMenuItem
        icon={
          <Circle size="small">
            <Icon icon={ArrowUpIcon} size={12} />
          </Circle>
        }
        primaryText={searchValue}
        onClick={onClick}
      />
      {flag('cozy.assistant.withSearchResult') && <SearchResult />}
    </List>
  )
}

export default ResultMenuContent
