import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'

import { buildChatConversationQueryById, buildMyselfQuery } from '../queries'
import ChatConversation from './ChatConversation'

const ConversationQuery = ({ id }) => {
  const chatConversationQuery = buildChatConversationQueryById(id)
  const { data: chatConversation, ...queryResult } = useQuery(
    chatConversationQuery.definition,
    chatConversationQuery.options
  )

  const myselfQuery = buildMyselfQuery()
  const { data: myselves, ...queryMyselfResult } = useQuery(
    myselfQuery.definition,
    myselfQuery.options
  )

  const isLoading =
    isQueryLoading(queryResult) || isQueryLoading(queryMyselfResult)

  if (isLoading) return null

  return (
    <ChatConversation conversation={chatConversation} myself={myselves[0]} />
  )
}

export default ConversationQuery
