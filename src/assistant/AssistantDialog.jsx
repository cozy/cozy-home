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
        dialogTitle: { className: isMobile ? 'u-ph-0' : '' },
        dialogActions: { className: isMobile ? 'u-mh-half' : 'u-mb-2' },
        divider: { className: 'u-dn' }
      }}
      title={
        isMobile && !assistantState.conversationId ? (
          <div className="u-mh-half u-mt-3">
            <ConversationSearchBar
              assistantStatus={assistantState.status}
              conversationId={assistantState.conversationId}
              hasArrowDown
              autoFocus
              onClose={onClose}
            />
          </div>
        ) : (
          ' '
        )
      }
      content={<Conversation id={assistantState.conversationId} />}
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
