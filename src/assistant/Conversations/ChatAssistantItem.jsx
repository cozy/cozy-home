import React, { useMemo } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'

import AssistantIcon from 'assets/images/icon-assistant.png'

import ChatItem from './ChatItem'

const ChatAssistantItem = ({ className, label, ...props }) => {
  const { t } = useI18n()
  // need memo to avoid rendering it everytime
  const icon = useMemo(() => <Icon icon={AssistantIcon} size={32} />, [])

  return (
    <ChatItem
      {...props}
      className={className}
      icon={icon}
      name={t('assistant.name')}
      label={label}
    />
  )
}

export default ChatAssistantItem
