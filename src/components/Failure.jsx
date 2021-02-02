import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import EmptyIcon from 'assets/icons/color/default.svg'
import { useI18n } from 'cozy-ui/transpiled/react'

import Typography from 'cozy-ui/transpiled/react/Typography'

const reload = () => {
  window.location.reload()
}

export const Failure = ({ errorType }) => {
  const { t } = useI18n()

  return (
    <Stack className="u-flex u-flex-column u-flex-items-center">
      <Icon icon={EmptyIcon} size={64} />
      <Typography tag="h2" className="u-ta-center" variant="h3" component="h1">
        {t(`error.${errorType}`)}
      </Typography>
      <Button label={t('error.button.reload')} onClick={reload} />
    </Stack>
  )
}

export default Failure
