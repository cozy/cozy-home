import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { buildMyselfQuery } from '../queries'
import ChatAssistantItem from './ChatAssistantItem'
import ChatConversation from './ChatConversation'

const Conversation = ({ id, myself }) => {
  const { t } = useI18n()
  const givenName = myself.name?.givenName

  return (
    <div className="u-maw-7 u-mh-auto">
      <ChatAssistantItem
        label={
          givenName
            ? t('assistant.hello_name', { name: givenName })
            : t('assistant.hello')
        }
      />
      {id && <ChatConversation id={id} myself={myself} />}
    </div>
  )
}

const ConversationWithQuery = ({ id }) => {
  const myselfQuery = buildMyselfQuery()
  const { data: myselves, ...queryMyselfResult } = useQuery(
    myselfQuery.definition,
    myselfQuery.options
  )

  const isLoading = isQueryLoading(queryMyselfResult)

  if (isLoading) return null

  return <Conversation id={id} myself={myselves[0]} />
}

export default ConversationWithQuery
