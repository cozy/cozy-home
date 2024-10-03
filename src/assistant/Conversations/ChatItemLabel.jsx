import React from 'react'
import { TypeAnimation } from 'react-type-animation'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Markdown from 'cozy-ui/transpiled/react/Markdown'

const ChatItemLabel = ({ label, noAnimation }) => {
  if (noAnimation) {
    if (typeof label === 'string') {
      return <Markdown content={label} />
    }
    return label
  }

  return (
    <Typography>
      <TypeAnimation cursor={false} sequence={[label]} speed={80} />
    </Typography>
  )
}

// need memo to avoid rendering all label of all items
export default React.memo(ChatItemLabel)
