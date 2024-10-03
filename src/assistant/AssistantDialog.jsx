import React from 'react'

import { FixedActionsDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import Conversation from './Conversations/Conversation'
import AssistantProvider, { useAssistant } from './AssistantProvider'
import SearchProvider from './SearchProvider'
import ConversationSearchBar from './Conversations/ConversationSearchBar'

const AssistantDialog = ({ onClose }) => {
  const { assistantState } = useAssistant()

  return (
    <FixedActionsDialog
      open
      fullScreen
      size="full"
      componentsProps={{
        divider: { className: 'u-dn' }
      }}
      content={<Conversation id={assistantState.conversationId} />}
      actions={
        <ConversationSearchBar
          assistantStatus={assistantState.status}
          conversationId={assistantState.conversationId}
        />
      }
      onClose={onClose}
    />
  )
}

const AssistantDialogProviders = props => {
  return (
    <AssistantProvider>
      <SearchProvider>
        <AssistantDialog {...props} />
      </SearchProvider>
    </AssistantProvider>
  )
}

export default AssistantDialogProviders
