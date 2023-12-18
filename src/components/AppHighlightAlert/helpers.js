import { getBackupAppHighlightAlert } from 'components/AppHighlightAlert/BackupAppHighlightAlert'
import { getGeolocationTrackingAppHighlightAlert } from 'components/AppHighlightAlert/GeolocationTrackingAppHighlightAlert'

export const getAvailableAppHighlightAlerts = async (client, installedApps) => {
  const appHighlightAlerts = [
    getBackupAppHighlightAlert(installedApps),
    await getGeolocationTrackingAppHighlightAlert(client, installedApps)
  ]

  const availableAppHighlightAlerts = appHighlightAlerts.filter(
    status => status.available
  )

  const selectedIndex = availableAppHighlightAlerts.findIndex(
    status => status.displayable
  )
  if (selectedIndex !== -1) {
    availableAppHighlightAlerts[selectedIndex].displayed = true
  }

  return availableAppHighlightAlerts
}
