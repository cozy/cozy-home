import React, { useState } from 'react'

import { useClient, useQuery } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import Snackbar from 'cozy-ui/transpiled/react/Snackbar'
import Alert from 'cozy-ui/transpiled/react/Alert'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LightbulbIcon from 'cozy-ui/transpiled/react/Icons/Lightbulb'

import { instanceSettingsConn, homeSettingsConn } from 'queries'
import {
  shouldShowDefaultRedirectionSnackbar,
  disableDefaultRedirectionSnackbar,
  setDefaultRedirectionToHome
} from './helpers'
import useIncrementDefaultRedirectionViewCount from './useIncrementDefaultRedirectionViewCount'

const useStyles = makeStyles(theme => ({
  snackbar: {
    marginBottom: 'var(--flagship-bottom-height, 0)',
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

  const webviewIntent = useWebviewIntent()

  const instanceSettingsResult = useQuery(
    instanceSettingsConn.query,
    instanceSettingsConn
  )

  const homeSettingsResult = useQuery(homeSettingsConn.query, homeSettingsConn)

  useIncrementDefaultRedirectionViewCount(
    instanceSettingsResult,
    homeSettingsResult
  )

  const showDefaultAppSnackbar = shouldShowDefaultRedirectionSnackbar(
    instanceSettingsResult,
    homeSettingsResult,
    isOpen
  )

  const onRefuse = () => {
    setIsOpen(false)
    disableDefaultRedirectionSnackbar(client, homeSettingsResult)
  }

  const onAccept = () => {
    setIsOpen(false)
    disableDefaultRedirectionSnackbar(client, homeSettingsResult)
    setDefaultRedirectionToHome(client, instanceSettingsResult, webviewIntent)
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
