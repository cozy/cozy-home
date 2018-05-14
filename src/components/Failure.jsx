import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Button from 'cozy-ui/react/Button'
import Empty from 'cozy-ui/react/Empty'
import EmptyIcon from '../assets/icons/color/default.svg'

const reload = () => {
  window.location.reload()
}

export const Failure = ({ t, errorType }) => (
  <Empty title={t(`error.${errorType}`)} icon={EmptyIcon}>
    <Button label={t('error.button.reload')} onClick={reload} />
  </Empty>
)

export default translate()(Failure)
