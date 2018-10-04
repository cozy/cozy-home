import React from 'react'

const fillWithGhostItems = num => {
  const elements = []
  for (let i = 0; i < num; i++) {
    elements.push(<div className="item-wrapper--ghost" />)
  }
  return elements
}

export default fillWithGhostItems
