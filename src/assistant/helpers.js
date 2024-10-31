export const getInstantMessage = assistantState =>
  Object.keys(assistantState.message)
    .sort((a, b) => a - b)
    .map(key => assistantState.message[key])
    .join('')

export const makeConversationId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`

export const pushMessagesIdInState = (res, setState) => {
  const messagesId = res.messages.map(message => message.id)
  setState(v => ({
    ...v,
    messagesId
  }))
}

export const isMessageForThisConversation = (res, messagesId) =>
  messagesId.includes(res._id)
