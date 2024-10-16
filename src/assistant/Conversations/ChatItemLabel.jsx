import React from 'react'

import Markdown from 'cozy-ui/transpiled/react/Markdown'

const ChatItemLabel = ({ label }) => {
  if (typeof label === 'string') {
    return <Markdown content={label} />
  }

  return label
}

// need memo to avoid rendering all label of all items
export default React.memo(ChatItemLabel)
