import React, { useState } from 'react'

import { useClient, generateWebLink } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'

import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import CircularProgress from 'cozy-ui/transpiled/react/CircularProgress'
import PhoneUploadIcon from 'cozy-ui/transpiled/react/Icons/PhoneUpload'
import CrossCircleOutlineIcon from 'cozy-ui/transpiled/react/Icons/CrossCircleOutline'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ConfirmStopBackupDialog from 'components/BackupNotification/ConfirmStopBackupDialog'
import { useBackupData } from 'components/BackupNotification/useBackupData'

import styles from 'styles/backupNotification.styl'

const BackupNotification = () => {
  const client = useClient()
  const { t } = useI18n()
  const [isConfirmStopBackupDialogOpen, setIsConfirmStopBackupDialogOpen] =
    useState(false)

  const webviewIntent = useWebviewIntent()
  const { backupInfo } = useBackupData()

  if (
    !isFlagshipApp() ||
    !backupInfo ||
    backupInfo.currentBackup.status !== 'running'
  ) {
    return null
  }

  const {
    currentBackup: { mediasToBackupCount, totalMediasToBackupCount }
  } = backupInfo

  const backupProgressPercentage =
    ((totalMediasToBackupCount - mediasToBackupCount) * 100) /
    totalMediasToBackupCount

  const onStop = async () => {
    await webviewIntent.call('stopBackup')
    setIsConfirmStopBackupDialogOpen(false)
  }

  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'photos'
  const nativePath = '/backup'
  const { subdomain: subDomainType } = client.getInstanceOptions()

  return (
    <div>
      <AppLinker
        app={{ slug: app }}
        nativePath={nativePath}
        href={generateWebLink({
          pathname: '/',
          cozyUrl: cozyURL.origin,
          slug: app,
          hash: nativePath,
          subDomainType
        })}
      >
        {({ onClick, href }) => (
          <div className={styles['backup-notification-wrapper']}>
            <ListItem
              component="a"
              ContainerComponent="div"
              onClick={onClick}
              href={href}
            >
              <ListItemIcon className="u-pos-relative">
                <Icon icon={PhoneUploadIcon} size={12} />
                <CircularProgress
                  variant="determinate"
                  value={backupProgressPercentage}
                  size={32}
                  className="u-pos-absolute"
                />
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={32}
                  className="u-pos-absolute"
                  classes={{
                    svg: styles['backup-circular-progress-background']
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" className="u-primaryTextColor">
                    {t('backup.backupInProgress')}
                  </Typography>
                }
                secondary={`${
                  totalMediasToBackupCount - mediasToBackupCount
                } / ${totalMediasToBackupCount}`}
              />
              <ListItemSecondaryAction
                onClick={() => setIsConfirmStopBackupDialogOpen(true)}
              >
                <ListItemIcon className="u-mr-half">
                  <Icon icon={CrossCircleOutlineIcon} size={16} />
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        )}
      </AppLinker>
      <CozyTheme variant="normal">
        {isConfirmStopBackupDialogOpen && (
          <ConfirmStopBackupDialog
            onClose={() => setIsConfirmStopBackupDialogOpen(false)}
            onStop={onStop}
          />
        )}
      </CozyTheme>
    </div>
  )
}

export default BackupNotification
