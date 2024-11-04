import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'

import { buildMyselfQuery } from '../queries'
import ChatConversation from './ChatConversation'

const Conversation = ({ id }) => {
  const myselfQuery = buildMyselfQuery()
  const { data: myselves, ...queryMyselfResult } = useQuery(
    myselfQuery.definition,
    myselfQuery.options
  )

  const isLoading = isQueryLoading(queryMyselfResult)

  if (isLoading) return null

  return (
    <div className="u-maw-7 u-mh-auto">
      <ChatConversation id={id} myself={myselves[0]} />
    </div>
  )
}

export default Conversation
