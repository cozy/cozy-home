import React from 'react'

import Stack from 'cozy-ui/react/Stack'
import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { MainTitle } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'

import EmptyIcon from 'assets/icons/color/default.svg'

const reload = () => {
  window.location.reload()
}

export const Failure = ({ t, errorType }) => (
  <Stack className="u-flex u-flex-column u-flex-items-center">
    <Icon icon={EmptyIcon} size={64} />
    <MainTitle tag="h2" className="u-ta-center">
      {t(`error.${errorType}`)}
    </MainTitle>
    <Button label={t('error.button.reload')} onClick={reload} />
  </Stack>
)

export default translate()(Failure)
