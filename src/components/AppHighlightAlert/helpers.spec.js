import { getAvailableAppHighlightAlerts } from 'components/AppHighlightAlert/helpers'
import { getBackupAppHighlightAlert } from 'components/AppHighlightAlert/BackupAppHighlightAlert'
import { getGeolocationTrackingAppHighlightAlert } from 'components/AppHighlightAlert/GeolocationTrackingAppHighlightAlert'

jest.mock('components/AppHighlightAlert/BackupAppHighlightAlert')
jest.mock('components/AppHighlightAlert/GeolocationTrackingAppHighlightAlert')

describe('getAvailableAppHighlightAlerts', () => {
  it('should set the only displayable alert as displayed if only one displayable alert found', async () => {
    getBackupAppHighlightAlert.mockReturnValue({
      name: 'BackupAppHighlightAlert',
      available: false,
      displayable: false
    })
    getGeolocationTrackingAppHighlightAlert.mockReturnValue({
      name: 'GeolocationTrackingAppHighlightAlert',
      available: true,
      displayable: true
    })

    const availableAppHighlightAlerts = await getAvailableAppHighlightAlerts()

    expect(availableAppHighlightAlerts).toEqual([
      {
        name: 'GeolocationTrackingAppHighlightAlert',
        available: true,
        displayable: true,
        displayed: true
      }
    ])
  })

  it('should set the first displayable alert as displayed if multiple displayable alerts found', async () => {
    getBackupAppHighlightAlert.mockReturnValue({
      name: 'BackupAppHighlightAlert',
      available: true,
      displayable: true
    })
    getGeolocationTrackingAppHighlightAlert.mockReturnValue({
      name: 'GeolocationTrackingAppHighlightAlert',
      available: true,
      displayable: true
    })

    const availableAppHighlightAlerts = await getAvailableAppHighlightAlerts()

    expect(availableAppHighlightAlerts).toEqual([
      {
        name: 'BackupAppHighlightAlert',
        available: true,
        displayable: true,
        displayed: true
      },
      {
        name: 'GeolocationTrackingAppHighlightAlert',
        available: true,
        displayable: true
      }
    ])
  })

  it('should not return not available alerts', async () => {
    getBackupAppHighlightAlert.mockReturnValue({
      name: 'BackupAppHighlightAlert',
      available: false,
      displayable: false
    })
    getGeolocationTrackingAppHighlightAlert.mockReturnValue({
      name: 'GeolocationTrackingAppHighlightAlert',
      available: false,
      displayable: false
    })

    const availableAppHighlightAlerts = await getAvailableAppHighlightAlerts()

    expect(availableAppHighlightAlerts).toEqual([])
  })

  it('should do nothing with not displayable alerts', async () => {
    getBackupAppHighlightAlert.mockReturnValue({
      name: 'BackupAppHighlightAlert',
      available: true,
      displayable: false
    })
    getGeolocationTrackingAppHighlightAlert.mockReturnValue({
      name: 'GeolocationTrackingAppHighlightAlert',
      available: true,
      displayable: false
    })

    const availableAppHighlightAlerts = await getAvailableAppHighlightAlerts()

    expect(availableAppHighlightAlerts).toEqual([
      {
        name: 'BackupAppHighlightAlert',
        available: true,
        displayable: false
      },
      {
        name: 'GeolocationTrackingAppHighlightAlert',
        available: true,
        displayable: false
      }
    ])
  })
})
