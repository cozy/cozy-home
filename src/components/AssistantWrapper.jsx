import React from 'react'
import flag from 'cozy-flags'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import AssistantBar from 'assistant/AssistantBar'

const AssistantWrapper = () => {
  const { isMobile } = useBreakpoints()

  if (!flag('cozy.assistant.enabled')) return null

  return (
    <div
      className={
        isMobile
          ? 'u-pos-fixed u-bottom-m u-right-m u-left-m'
          : 'app-list-wrapper u-mb-3 u-mh-auto u-w-100'
      }
    >
      <AssistantBar />
    </div>
  )
}

export default AssistantWrapper
