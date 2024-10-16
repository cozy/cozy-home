import React, { useRef, useEffect } from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'

import { buildChatConversationQueryById } from '../queries'
import { useAssistant } from '../AssistantProvider'
import ChatUserItem from './ChatUserItem'
import ChatAssistantItem from './ChatAssistantItem'
import ChatRealtimeAnswer from './ChatRealtimeAnswer'

const ChatConversation = ({ conversation, myself }) => {
  const { assistantState } = useAssistant()
  const listRef = useRef()

  const showLastConv = assistantState.status !== 'idle'

  useEffect(() => {
    // force scroll down if new message of change in AI instant response
    listRef.current?.lastElementChild?.scrollIntoView({ block: 'end' })
  }, [
    conversation?.messages?.length,
    assistantState.status,
    assistantState.message
  ])

  return (
    <div ref={listRef}>
      {conversation?.messages.map((message, idx) => {
        if (message.role === 'user') {
          return (
            <ChatUserItem
              key={conversation._id + '--' + idx}
              className="u-mt-1-half"
              myself={myself}
              label={message.content}
            />
          )
        }

        if (idx !== conversation?.messages.length - 1) {
          return (
            <ChatAssistantItem
              key={conversation._id + '--' + idx}
              className="u-mt-1-half"
              label={message.content}
            />
          )
        }

        if (showLastConv) {
          return null
        }

        return (
          <ChatAssistantItem
            key={conversation._id + '--' + idx}
            className="u-mt-1-half"
            label={message.content}
          />
        )
      })}

      {showLastConv && (
        <ChatRealtimeAnswer
          isLoading={assistantState.status === 'pending'}
          label={assistantState.message}
        />
      )}
    </div>
  )
}

const ChatConversationWithQuery = ({ id, myself }) => {
  const chatConversationQuery = buildChatConversationQueryById(id)
  const { data: chatConversation, ...queryResult } = useQuery(
    chatConversationQuery.definition,
    chatConversationQuery.options
  )

  const isLoading = isQueryLoading(queryResult)

  if (isLoading) return null

  return <ChatConversation conversation={chatConversation} myself={myself} />
}

export default ChatConversationWithQuery
