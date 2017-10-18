import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

const reload = () => {
  window.location.reload()
}

export const Failure = ({ t, errorType }) => (
  <div className="con-error">
    <h2>{t(`error.${errorType}`)}</h2>
    <p>
      <button
        role="button"
        className="coz-btn coz-btn--regular"
        onClick={reload}
      >
        {t('error.button.reload')}
      </button>
    </p>
  </div>
)

export default translate()(Failure)
