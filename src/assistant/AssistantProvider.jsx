import React, { useMemo, useContext, useState, useCallback } from 'react'

import { useClient } from 'cozy-client'
import useRealtime from 'cozy-ui/transpiled/react/hooks/useRealtime'

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
    messages: [],
    status: 'idle',
    conversationId: undefined
  })

  useRealtime(client, {
    'io.cozy.ai.chat.events': {
      created: res => {
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
        } else {
          setAssistantState(v => {
            const arr = v.messages
            arr.push({
              message: res.content,
              position: res.position
            })

            return {
              ...v,
              messages: arr,
              status: 'writing'
            }
          })
        }
      }
    }
  })

  const onAssistantExecute = useCallback(
    async (inputValue, callback) => {
      if (!inputValue) return

      callback()

      setAssistantState(v => ({
        ...v,
        messages: [],
        status: 'idle'
      }))

      const id =
        assistantState.conversationId ||
        `${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`

      await client.stackClient.fetchJSON(
        'POST',
        `/ai/chat/conversations/${id}`,
        {
          q: inputValue
        }
      )

      setAssistantState(v => ({
        ...v,
        messages: [],
        status: 'pending',
        conversationId:
          id !== assistantState.conversationId ? id : v.conversationId
      }))
    },
    [client, assistantState.conversationId]
  )

  const value = useMemo(
    () => ({
      assistantState,
      setAssistantState,
      onAssistantExecute
    }),
    [assistantState, onAssistantExecute]
  )

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  )
}

export default React.memo(AssistantProvider)
