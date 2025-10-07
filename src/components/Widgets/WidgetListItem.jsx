import React from 'react'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

const WidgetListItem = ({ widget, client, onAdd, onRemove, button = false }) => {
  return (
    <ListItem
      button={button}
      onClick={button && onAdd ? onAdd : undefined}
    >
      <div style={{ width: 20, height: 20 }}>
        {widget.props.app && (
          <AppIcon client={client} app={widget.props.app} priority="registry" type="app" />
        )}
        {widget.props.icon && !widget.props.app && (
          <Icon icon={widget.props.icon} size={20} />
        )}
      </div>

      <ListItemText primary={widget.props.title} />

      {onRemove && (
        <ListItemSecondaryAction>
          <IconButton onClick={onRemove}>
            <Icon icon="trash" />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

export default WidgetListItem
