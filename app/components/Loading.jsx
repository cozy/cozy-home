import React from 'react'
import { translate } from '../plugins/preact-polyglot'

export const Loading = ({ t, loadingType, noMargin }) => {
  return (
    <div
      className={noMargin
        ? 'coz-loading--no-margin'
        : 'coz-loading'
      }
    >
      {loadingType && <p>{t(`Loading.${loadingType}`)}</p>}
    </div>
  )
}

export default translate()(Loading)
