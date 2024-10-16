import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import Conversation from '../Conversations/Conversation'
import ConversationBar from '../Conversations/ConversationBar'
import { useAssistant } from '../AssistantProvider'

const AssistantDialog = () => {
  const { assistantState, clearAssistant } = useAssistant()
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()

  const onClose = () => {
    navigate('..')
    clearAssistant()
  }

  return (
    <FixedDialog
      open
      fullScreen
      size="full"
      componentsProps={{
        dialogTitle: { className: isMobile ? 'u-ph-0' : '' },
        dialogActions: { className: isMobile ? 'u-mh-half' : 'u-mb-2' },
        divider: { className: 'u-dn' }
      }}
      title={isMobile ? ' ' : ' '}
      content={<Conversation id={assistantState.conversationId} />}
      actions={<ConversationBar assistantStatus={assistantState.status} />}
      onClose={onClose}
    />
  )
}

export default AssistantDialog
