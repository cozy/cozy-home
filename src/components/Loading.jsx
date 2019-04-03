import React from 'react'

import { translate } from 'cozy-ui/react/I18n'

export const Loading = ({ t, loadingType, noMargin }) => {
  return (
    <div className={noMargin ? 'coz-loading--no-margin' : 'coz-loading'}>
      {loadingType && <p>{t(`loading.${loadingType}`)}</p>}
    </div>
  )
}

export default translate()(Loading)
