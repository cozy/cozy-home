import React from 'react'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import Conversation from './Conversations/Conversation'
import ConversationSearchBar from './Conversations/ConversationSearchBar'
import AssistantProvider, { useAssistant } from './AssistantProvider'
import SearchProvider from './SearchProvider'

import styles from './styles.styl'

const AssistantDialog = ({ onClose }) => {
  const { assistantState } = useAssistant()
  const { isMobile } = useBreakpoints()

  return (
    <FixedDialog
      open
      fullScreen
      size="full"
      className={styles['assistantDialog']}
      componentsProps={{
        divider: { className: 'u-dn' }
      }}
      title=" "
      content={
        <>
          {isMobile && !assistantState.conversationId && (
            <div className="u-mb-2">
              <ConversationSearchBar
                assistantStatus={assistantState.status}
                conversationId={assistantState.conversationId}
                hasArrowDown
                autoFocus
                onClose={onClose}
              />
            </div>
          )}
          <Conversation id={assistantState.conversationId} />
        </>
      }
      actions={
        isMobile ? (
          assistantState.conversationId && (
            <ConversationSearchBar
              assistantStatus={assistantState.status}
              conversationId={assistantState.conversationId}
              autoFocus={!isMobile}
              onClose={onClose}
            />
          )
        ) : (
          <ConversationSearchBar
            assistantStatus={assistantState.status}
            conversationId={assistantState.conversationId}
            autoFocus
          />
        )
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
