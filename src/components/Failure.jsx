import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import EmptyIcon from 'assets/icons/color/default.svg'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Typography from 'cozy-ui/transpiled/react/Typography'

const reload = () => {
  window.location.reload()
}

export const Failure = ({ errorType }) => {
  const { t } = useI18n()

  return (
    <Stack className="failure-wrapper u-flex u-flex-column u-flex-items-center u-ph-1">
      <Icon icon={EmptyIcon} size={64} className="u-mb-1" />

      <Typography
        tag="h2"
        className="u-ta-center u-primaryContrastTextColor u-mb-1"
        variant="h3"
        component="h1"
      >
        {t(`error.${errorType}`)}
      </Typography>

      <Button label={t('error.button.reload')} onClick={reload} />
    </Stack>
  )
}

export default Failure
