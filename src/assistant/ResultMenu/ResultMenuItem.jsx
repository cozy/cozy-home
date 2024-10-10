import React from 'react'

import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const ResultMenuItem = ({ icon, primaryText, secondaryText, onClick }) => {
  const iconComponent =
    icon.type === 'component' ? (
      <Icon icon={icon.component} size={32} />
    ) : icon.type === 'app' ? (
      <AppIcon app={icon.app} />
    ) : (
      icon
    )

  return (
    <ListItem button size="small" onClick={onClick}>
      <ListItemIcon>{iconComponent}</ListItemIcon>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </ListItem>
  )
}

export default ResultMenuItem
