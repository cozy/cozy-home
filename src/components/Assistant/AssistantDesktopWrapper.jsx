import React from 'react'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { isTwakeTheme } from 'cozy-ui/transpiled/react/helpers/isTwakeTheme'

import { AssistantDesktop } from 'cozy-search'

import styles from './assistant.styl'

export const AssistantDesktopWrapper = () => {
  const { type } = useCozyTheme()

  return (
    <CozyTheme variant="normal">
      <div className="app-list-wrapper u-mh-auto u-mb-3">
        <AssistantDesktop
          componentsProps={{
            SearchBarDesktop: isTwakeTheme()
              ? {
                  size: 'medium',
                  className: styles[`search-bar-background--${type}`],
                  hasHalfBorderRadius: true
                }
              : {
                  elevation: 1,
                  hasHalfBorderRadius: true
                }
          }}
        />
      </div>
    </CozyTheme>
  )
}

export default AssistantDesktopWrapper
