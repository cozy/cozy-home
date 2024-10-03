import React from 'react'

import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const ResultMenuItem = ({ icon, primaryText, secondaryText, onClick }) => {
  return (
    <ListItem button size="small" onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </ListItem>
  )
}

export default ResultMenuItem
