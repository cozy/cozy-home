import React, { useMemo, useContext, useState, useCallback } from 'react'
import set from 'lodash/set'

import { useClient } from 'cozy-client'
import useRealtime from 'cozy-realtime/dist/useRealtime'

import { CHAT_EVENTS_DOCTYPE, CHAT_CONVERSATIONS_DOCTYPE } from './queries'
import { pushMessagesIdInState, isMessageForThisConversation } from './helpers'

export const AssistantContext = React.createContext()

export const useAssistant = () => {
  const context = useContext(AssistantContext)

  if (!context) {
    throw new Error('useAssistant must be used within a AssistantProvider')
  }
  return context
}

const AssistantProvider = ({ children }) => {
  const client = useClient()
  const [assistantState, setAssistantState] = useState({
    message: {},
    status: 'idle',
    messagesId: []
  })

  useRealtime(
    client,
    {
      [CHAT_CONVERSATIONS_DOCTYPE]: {
        created: res => {
          pushMessagesIdInState(res, setAssistantState)
        },
        updated: res => {
          pushMessagesIdInState(res, setAssistantState)
        }
      }
    },
    []
  )

  useRealtime(
    client,
    {
      [CHAT_EVENTS_DOCTYPE]: {
        created: res => {
          setAssistantState(prevState => {
            // to exclude realtime messages if not relevant to the actual conversation
            if (!isMessageForThisConversation(res, prevState.messagesId)) {
              return prevState
            }

            if (res.object === 'done') {
              if (prevState.status !== 'idle') {
                return {
                  ...prevState,
                  status: 'idle'
                }
              }
            }

            if (res.object === 'delta') {
              const message = set(prevState.message, res.position, res.content)
              return {
                ...prevState,
                message,
                status: 'writing'
              }
            }

            return prevState
          })
        }
      }
    },
    []
  )

  const clearAssistant = useCallback(
    () =>
      setAssistantState({
        message: {},
        status: 'idle',
        messagesId: []
      }),
    []
  )

  const onAssistantExecute = useCallback(
    async ({ value, conversationId }, callback) => {
      if (!value) return

      callback?.()

      clearAssistant()

      await client.stackClient.fetchJSON(
        'POST',
        `/ai/chat/conversations/${conversationId}`,
        {
          q: value
        }
      )

      setAssistantState(v => ({
        ...v,
        status: 'pending'
      }))
    },
    [client, clearAssistant]
  )

  const value = useMemo(
    () => ({
      assistantState,
      setAssistantState,
      clearAssistant,
      onAssistantExecute
    }),
    [assistantState, clearAssistant, onAssistantExecute]
  )

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  )
}

export default React.memo(AssistantProvider)
