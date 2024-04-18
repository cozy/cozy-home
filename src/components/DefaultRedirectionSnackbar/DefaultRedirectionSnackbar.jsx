import React, { useState } from 'react'

import { useSettings } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import Snackbar from 'cozy-ui/transpiled/react/Snackbar'
import Alert from 'cozy-ui/transpiled/react/Alert'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LightbulbIcon from 'cozy-ui/transpiled/react/Icons/Lightbulb'

import {
  HOME_DEFAULT_REDIRECTION,
  useShouldShowDefaultRedirectionSnackbar
} from './helpers'
import useIncrementDefaultRedirectionViewCount from './useIncrementDefaultRedirectionViewCount'
import { isFlagshipApp } from 'cozy-device-helper'

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
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(true)

  const webviewIntent = useWebviewIntent()

  const { save: saveHome } = useSettings('home', [
    'default_redirection_snackbar_disabled'
  ])

  const { save: saveGlobal } = useSettings('instance', ['default_redirection'])

  useIncrementDefaultRedirectionViewCount()

  const showDefaultAppSnackbar = useShouldShowDefaultRedirectionSnackbar(isOpen)

  const onRefuse = () => {
    setIsOpen(false)
    saveHome({
      default_redirection_snackbar_disabled: true
    })
  }

  const onAccept = () => {
    setIsOpen(false)
    saveHome({
      default_redirection_snackbar_disabled: true
    })
    saveGlobal({
      default_redirection: HOME_DEFAULT_REDIRECTION
    })
    if (isFlagshipApp()) {
      webviewIntent.call('setDefaultRedirection', HOME_DEFAULT_REDIRECTION)
    }
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
