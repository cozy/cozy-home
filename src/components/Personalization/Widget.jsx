import React, { useEffect, useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography';
import List from 'cozy-ui/transpiled/react/List';
import ListItem from 'cozy-ui/transpiled/react/ListItem';
import ListItemText from 'cozy-ui/transpiled/react/ListItemText';
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction';
import Switch from 'cozy-ui/transpiled/react/Switch';
import { ListItemIcon } from '@material-ui/core';
import { AppIcon } from 'cozy-ui/transpiled/react/AppIcon';
import { AvailableWidgets } from '../Widgets/WidgetsWrapper';

import { appsConn } from '@/queries';
import { useQuery } from 'cozy-client'

const Widget = ({ client }) => {
  const { data: apps } = useQuery(appsConn.query, appsConn)
  const { data: { widgets }, installWidget, uninstallWidget } = useWallpaperContext();

  const getAppBySlug = (slug) => {
    return apps?.find(app => app.slug === slug)
  }

  return (
    <div>
      <List style={{ padding: 0 }}>
        {AvailableWidgets.map((widget, index) => (
          <ListItem dense button>
            <ListItemIcon>
              <div
                style={{
                  width: 32,
                  height: 32,
                }}
              >
                <AppIcon app={widget.name} client={client} priority="registry" type="app" />
              </div>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body2'>
                {(getAppBySlug(widget.name)?.name) || widget.name}
              </Typography>
            </ListItemText>
            <ListItemSecondaryAction className='u-mr-1'>
              <Switch checked={false} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Widget