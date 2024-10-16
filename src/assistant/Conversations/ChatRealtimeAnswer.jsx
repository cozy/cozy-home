import React from 'react'

import Skeleton from 'cozy-ui/transpiled/react/Skeleton'

import ChatAssistantItem from './ChatAssistantItem'

const ChatRealtimeAnswer = ({ isLoading, label }) => {
  return (
    <ChatAssistantItem
      className="u-mt-1-half"
      label={
        isLoading ? (
          <span>
            <Skeleton width="100%" />
            <Skeleton width="60%" />
          </span>
        ) : (
          label
        )
      }
    />
  )
}

export default ChatRealtimeAnswer
