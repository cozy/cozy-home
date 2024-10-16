import React from 'react'

import { getDisplayName, getInitials } from 'cozy-client/dist/models/contact'
import Avatar from 'cozy-ui/transpiled/react/Avatar'

import ChatItem from './ChatItem'

const ChatUserItem = ({ className, label, myself, ...props }) => {
  return (
    <ChatItem
      {...props}
      className={className}
      icon={<Avatar text={getInitials(myself)} size="small" />}
      name={getDisplayName(myself)}
      label={label}
    />
  )
}

export default ChatUserItem
