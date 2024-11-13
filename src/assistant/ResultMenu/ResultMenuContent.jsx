import React, { forwardRef } from 'react'

import flag from 'cozy-flags'
import List from 'cozy-ui/transpiled/react/List'
import Circle from 'cozy-ui/transpiled/react/Circle'
import PaperplaneIcon from 'cozy-ui/transpiled/react/Icons/Paperplane'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListItemSkeleton'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { useDataProxy } from 'dataproxy/DataProxyProvider'

import { useSearch } from '../Search/SearchProvider'
import ResultMenuItem from './ResultMenuItem'

const SearchResult = () => {
  const { isLoading, results, selectedIndex, searchValue } = useSearch()

  if (isLoading && !results?.length)
    return (
      <>
        <ListItemSkeleton hasSecondary />
        <ListItemSkeleton hasSecondary />
        <ListItemSkeleton hasSecondary />
      </>
    )

  return results.map((result, idx) => (
    <ResultMenuItem
      key={result.id || idx}
      icon={result.icon}
      slug={result.slug}
      primaryText={result.primary}
      secondaryText={result.secondary}
      secondaryUrl={result.secondaryUrl}
      query={searchValue}
      highlightQuery="true"
      selected={
        flag('cozy.assistant.enabled')
          ? selectedIndex === idx + 1
          : selectedIndex === idx
      }
      onClick={result.onClick}
    />
  ))
}

const ResultMenuContent = forwardRef(({ onClick }, ref) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { searchValue, selectedIndex } = useSearch()
  const { dataProxyServicesAvailable } = useDataProxy()

  return (
    <List ref={ref}>
      {flag('cozy.assistant.enabled') && (
        <ResultMenuItem
          icon={
            <Circle size="small">
              <Icon icon={PaperplaneIcon} size={isMobile ? 12 : undefined} />
            </Circle>
          }
          primaryText={searchValue}
          query={searchValue}
          secondaryText={t('assistant.search.result')}
          selected={selectedIndex === 0}
          onClick={onClick}
        />
      )}
      {dataProxyServicesAvailable && <SearchResult />}
    </List>
  )
})

ResultMenuContent.displayName = 'ResultMenuContent'

export default ResultMenuContent
