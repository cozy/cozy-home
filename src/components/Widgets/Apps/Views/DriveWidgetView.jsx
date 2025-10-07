import React, { useState, useEffect } from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Widget from '../../Atoms/Widget'
import WidgetTabs, { LoadingWidgetView, UnimplementedWidgetView } from '../../Atoms/WidgetTabs'
import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import { buildDriveFoldersQuery, buildDriveRecentsQuery, buildDriveSharedQuery, buildDriveTrashedQuery } from '../Queries/DriveQueries'
import List from 'cozy-ui/transpiled/react/List'
import ListItemByDoc from 'cozy-ui/transpiled/react/ListItem/ListItemByDoc'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import Filename from 'cozy-ui/transpiled/react/Filename'
import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const DriveWidgetView = () => {
  return (
    <>
      <WidgetTabs
        tabs={[
          { label: "Fichiers", icon: "clock", render: <DriveWidgetFileTab /> },
          { label: "Dossiers", icon: "folder", render: <DriveWidgetFoldersTab /> },
          { label: "Corbeille", icon: "trash", render: <DriveWidgetTrashedTab /> },
          // { label: "Partagés", icon: "share", render: <UnimplementedWidgetView /> },
        ]}
      />
    </>
  )
}

export const DriveWidgetFileTab = () => {
  const client = useClient()
  const { t } = useI18n()

  const driveQuery = buildDriveRecentsQuery()

  const { data: files, filesFetchStatus } = useQuery(
    driveQuery.definition,
    driveQuery.options
  )

  if (filesFetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!files || files.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Drive.NoRecentFiles')} />
    )
  }

  return (
    <List dense style={{ padding: 0 }}>
      {files && files.length > 0 && files.map(file => 
        <WidgetDriveFileItem key={file._id} file={file} client={client} />
      )}
    </List>
  )
}

export const DriveWidgetFoldersTab = () => {
  const client = useClient()
  const { t } = useI18n()

  const foldersQuery = buildDriveFoldersQuery()

  const { data: folders, filesFetchStatus } = useQuery(
    foldersQuery.definition,
    foldersQuery.options
  )

  if (filesFetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!folders || folders.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Drive.NoRecentFolders')} />
    )
  }

  return (
    <List dense style={{ padding: 0 }}>
      {folders && folders.length > 0 && folders.map(folder => 
        <WidgetDriveFolderItem key={folder._id} folder={folder} client={client} />
      )}
    </List>
  )
}

export const DriveWidgetTrashedTab = () => {
  const client = useClient()
  const { t } = useI18n()

  const driveQuery = buildDriveTrashedQuery()

  const { data: files, filesFetchStatus } = useQuery(
    driveQuery.definition,
    driveQuery.options
  )

  if (filesFetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!files || files.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Drive.NoTrashedFiles')} />
    )
  }

  return (
    <List dense style={{ padding: 0 }}>
      {files && files.length > 0 && files.map(file => 
        <WidgetDriveFileItem key={file._id} file={file} client={client} />
      )}
    </List>
  )
}

export const WidgetDriveFileItem = ({ file, client }) => {
  const directory = file.dir_id
  const fileId = file.id

  const driveURL = useAppLinkWithStoreFallback(
    'drive',
    client,
    `#/folder/${directory}/file/${fileId}`
  ).url

  const openFile = () => {
    window.location.href = driveURL
  }

  return (
    <ListItemByDoc
      key={file._id}
      doc={file}
      size="small"
      compact
      button
      onClick={() => { openFile() }}
      primary={
        <Filename
          variant={'subtitle1'}
          filename={file.name.split('.').slice(0, -1).join('.')}
          extension={"." + file.name.split('.').pop()}
          midEllipsis
        />
      }
      secondary={
        <Typography variant="caption" color="textSecondary">
          {new Date(file.cozyMetadata.updatedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      }
    />
  )
}

export const WidgetDriveFolderItem = ({ folder, client }) => {
  const directory = folder.dir_id

  const driveURL = useAppLinkWithStoreFallback(
    'drive',
    client,
    `#/folder/${directory}`
  ).url

  const openFile = () => {
    window.location.href = driveURL
  }

  return (
    <ListItemByDoc
      key={folder._id}
      doc={folder}
      size="small"
      compact
      button
      icon={<Icon icon={FileTypeFolderIcon} size={32} />}
      onClick={() => { openFile() }}
      primary={
        <Typography
          variant={'subtitle1'}
        >
          {folder.name}
        </Typography>
      }
      secondary={
        <Typography variant="caption" color="textSecondary">
          {new Date(folder.cozyMetadata.updatedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      }
    />
  )
}