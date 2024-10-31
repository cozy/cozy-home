import React, { useMemo, useContext, useState, useCallback } from 'react'
import set from 'lodash/set'

import { useClient } from 'cozy-client'
import useRealtime from 'cozy-realtime/dist/useRealtime'

import { CHAT_EVENTS_DOCTYPE, CHAT_CONVERSATIONS_DOCTYPE } from './queries'

export const AssistantContext = React.createContext()

export const getInstantMessage = assistantState =>
  Object.keys(assistantState.message)
    .sort((a, b) => a - b)
    .map(key => assistantState.message[key])
    .join('')

export const makeConversationId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`

export const useAssistant = () => {
  const context = useContext(AssistantContext)

  if (!context) {
    throw new Error('useAssistant must be used within a AssistantProvider')
  }
  return context
}

const pushMessagesIdInState = (res, setState) => {
  const messagesId = res.messages.map(message => message.id)
  setState(v => ({
    ...v,
    messagesId
  }))
}

const isMessageForThisConversation = (res, messagesId) =>
  messagesId.includes(res._id)

const AssistantProvider = ({ children }) => {
  const client = useClient()
  const [assistantState, setAssistantState] = useState({
    message: {},
    status: 'idle',
    messagesId: []
  })

  useRealtime(client, {
    [CHAT_CONVERSATIONS_DOCTYPE]: {
      created: res => {
        pushMessagesIdInState(res, setAssistantState)
      },
      updated: res => {
        pushMessagesIdInState(res, setAssistantState)
      }
    }
  })

  useRealtime(client, {
    [CHAT_EVENTS_DOCTYPE]: {
      created: res => {
        // to exclude realtime messages if not relevant to the actual conversation
        if (!isMessageForThisConversation(res, assistantState.messagesId)) {
          return
        }

        if (res.object === 'done') {
          if (assistantState.status !== 'idle') {
            // to be sure the last response is inside io.cozy.ai.chat.conversations
            setTimeout(() => {
              setAssistantState(v => ({
                ...v,
                status: 'idle'
              }))
            }, 250)
          }
        }

        if (res.object === 'delta') {
          const message = set(assistantState.message, res.position, res.content)

          setAssistantState(v => ({
            ...v,
            message,
            status: 'writing'
          }))
        }
      }
    }
  })

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
