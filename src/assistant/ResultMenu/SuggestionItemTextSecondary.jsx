/**
 * Code copied and adapted from cozy-drive
 *
 * See source: https://github.com/cozy/cozy-drive/blob/fbe2df67199683b23a40f476ccdacb00ee027459/src/modules/search/components/SuggestionItemTextSecondary.jsx
 */
import React from 'react'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import SuggestionItemTextHighlighted from './SuggestionItemTextHighlighted'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import styles from './styles.styl'

const SuggestionItemTextSecondary = ({ text, query, url, slug }) => {
  const { isMobile } = useBreakpoints()

  if (isMobile || !url) {
    return <SuggestionItemTextHighlighted text={text} query={query} />
  }

  const app = { slug }
  return (
    <AppLinker app={app} href={url}>
      {({ href, onClick }) => (
        <a
          className={styles['suggestion-item-parent-link']}
          href={href}
          onClick={e => {
            e.stopPropagation()
            if (typeof onClick == 'function') {
              onClick(e)
            }
          }}
        >
          <SuggestionItemTextHighlighted
            text={text}
            query={query}
            slug={slug}
          />
        </a>
      )}
    </AppLinker>
  )
}

export default SuggestionItemTextSecondary
