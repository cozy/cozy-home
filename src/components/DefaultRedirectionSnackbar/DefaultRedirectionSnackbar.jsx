import React, { useState } from 'react'

import { useClient, useQuery } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import Snackbar from 'cozy-ui/transpiled/react/Snackbar'
import Alert from 'cozy-ui/transpiled/react/Alert'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LightbulbIcon from 'cozy-ui/transpiled/react/Icons/Lightbulb'

import { instanceSettingsConn } from 'queries'
import { useIncrementNavAppShowCount } from './hooks'
import {
  shouldShowDefaultRedirectionSnackbar,
  disableDefaultRedirectionSnackbar,
  setDefaultRedirectionToHome
} from './helpers'

const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90
    }
  }
}))

const DefaultAppSnackbar = () => {
  const { t } = useI18n()
  const client = useClient()
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(true)

  const instanceSettingsResult = useQuery(
    instanceSettingsConn.query,
    instanceSettingsConn
  )

  useIncrementNavAppShowCount(instanceSettingsResult)

  const showDefaultAppSnackbar = shouldShowDefaultRedirectionSnackbar(
    instanceSettingsResult,
    isOpen
  )

  const onRefuse = () => {
    setIsOpen(false)
    disableDefaultRedirectionSnackbar(client, instanceSettingsResult)
  }

  const onAccept = () => {
    setIsOpen(false)
    disableDefaultRedirectionSnackbar(client, instanceSettingsResult)
    setDefaultRedirectionToHome(client, instanceSettingsResult)
  }

  return (
    <Snackbar
      open={showDefaultAppSnackbar}
      className={classes.snackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        icon={<Icon icon={LightbulbIcon} />}
        severity="primary"
        variant="filled"
      >
        {t('defaultRedirection.snackbar.description')}
        <div className="u-ml-auto">
          <Button
            label={t('defaultRedirection.snackbar.refuse')}
            size="small"
            onClick={onRefuse}
          />
          <Button
            label={t('defaultRedirection.snackbar.accept')}
            size="small"
            onClick={onAccept}
          />
        </div>
      </Alert>
    </Snackbar>
  )
}

export default DefaultAppSnackbar
