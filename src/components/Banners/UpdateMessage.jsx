/* global cozy */

import React, { useState, useCallback } from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import Infos from 'cozy-ui/transpiled/react/Infos'
import Typography from 'cozy-ui/transpiled/react/Typography'
import PropTypes from 'prop-types'

const UpdateMessage = props => {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { t } = useI18n()
  const { isBlocking, konnector } = props

  const handleRedirectToStore = useCallback(async () => {
    setIsRedirecting(true)

    try {
      await cozy.client.intents.redirect('io.cozy.apps', {
        slug: konnector.slug,
        step: 'update'
      })
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error)
      setIsRedirecting(false)
    }
  }, [konnector])

  return (
    <Infos
      theme={isBlocking ? 'danger' : 'secondary'}
      description={
        <>
          <Typography
            variant="h5"
            gutterBottom
            className={isBlocking ? 'u-error' : ''}
          >
            {t('update.title')}
          </Typography>
          <Typography variant="body1">
            {isBlocking ? t('update.blocking') : t('update.regular')}
          </Typography>
        </>
      }
      action={
        <Button
          label={t('update.CTA')}
          theme="danger"
          className="u-m-0"
          onClick={handleRedirectToStore}
          disabled={isRedirecting}
        />
      }
    />
  )
}

UpdateMessage.propTypes = {
  konnector: PropTypes.object.isRequired,
  isBlocking: PropTypes.bool
}

export default UpdateMessage
