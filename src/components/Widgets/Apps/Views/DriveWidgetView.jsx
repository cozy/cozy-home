import React, { useState, useEffect } from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Widget from '../../Atoms/Widget'
import WidgetTabs, { LoadingWidgetView, UnimplementedWidgetView } from '../../Atoms/WidgetTabs'
import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import { buildDriveFavoritesQuery, buildDriveFoldersQuery, buildDriveRecentsQuery, buildDriveSharedQuery, buildDriveTrashedQuery } from '../Queries/DriveQueries'
import List from 'cozy-ui/transpiled/react/List'
import ListItemByDoc from 'cozy-ui/transpiled/react/ListItem/ListItemByDoc'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import Filename from 'cozy-ui/transpiled/react/Filename'
import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SharedDocuments from 'cozy-sharing/dist/components/SharedDocuments'


import styles from './DriveWidgetView.styl'

export const DriveWidgetView = () => {
  return (
    <>
      <SharedDocuments>
        {({ sharedDocuments, allLoaded }) => (
          <WidgetTabs
            tabs={[
              { label: "Fichiers", icon: "clock", render: <DriveWidgetFileTab /> },
              { label: "Partages", icon: "share", render: <DriveWidgetSharingsTab sharedDocumentIds={sharedDocuments} /> },
              { label: "Favoris", icon: "star", render: <DriveWidgetFavoritesTab /> },
              // { label: "Partagés", icon: "share", render: <UnimplementedWidgetView /> },
            ]}
          />
        )}
      </SharedDocuments>
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

export const DriveWidgetSharingsTab = ({ sharedDocumentIds = []}) => {
  const client = useClient()
  const { t } = useI18n()

  const driveQuery = buildDriveSharedQuery({ ids: sharedDocumentIds })

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

export const DriveWidgetFavoritesTab = () => {
  const client = useClient()
  const { t } = useI18n()

  const driveQuery = buildDriveFavoritesQuery()

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

  const drivePathURL = useAppLinkWithStoreFallback(
    'drive',
    client,
    `#/folder/${directory}`
  ).url

  const openFile = () => {
    window.location.href = driveURL
  }

  console.log('Rendering file item for file:', file)

  const finalPath = file.restore_path ? file.restore_path : file.path;

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
        <a
          href={drivePathURL}
          className={styles['underline-on-hover']}
          style={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "block",
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            color: 'inherit',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
              minWidth: 0,
              textOverflow: 'ellipsis',
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {finalPath.split('/').slice(1).map((part, index, arr) => (
              <>
                {index > 0 && index < arr.length &&
                  <Typography variant="caption" color="textSecondary" className="slash">
                    /
                  </Typography>
                }
                <Typography variant="caption" color="textPrimary" style={{ display: "inline" }}>
                  {part}
                </Typography>
              </>
            ))}
          </div>
        </a>
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