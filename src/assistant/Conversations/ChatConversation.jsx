import React, { useRef, useEffect } from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'

import { buildChatConversationQueryById } from '../queries'
import { useAssistant } from '../AssistantProvider'
import { getInstantMessage } from '../helpers'
import ChatUserItem from './ChatUserItem'
import ChatAssistantItem from './ChatAssistantItem'
import ChatRealtimeAnswer from './ChatRealtimeAnswer'

const ChatConversation = ({ conversation, myself }) => {
  const { assistantState } = useAssistant()
  const listRef = useRef()

  // test on role === user to be sure the last response is inside io.cozy.ai.chat.conversations
  const showRealtimeMessage =
    assistantState.status !== 'idle' ||
    conversation?.messages?.[conversation?.messages?.length - 1]?.role ===
      'user'

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
              id={message.id}
              label={message.content}
              sources={message.sources}
            />
          )
        }

        if (showRealtimeMessage) {
          return null
        }

        return (
          <ChatAssistantItem
            key={conversation._id + '--' + idx}
            className="u-mt-1-half"
            id={message.id}
            label={message.content}
            sources={message.sources}
          />
        )
      })}

      {showRealtimeMessage && (
        <ChatRealtimeAnswer
          isLoading={assistantState.status === 'pending'}
          label={getInstantMessage(assistantState)}
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
