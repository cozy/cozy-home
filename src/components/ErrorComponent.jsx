import React from 'react'
import { translate } from '../plugins/i18n'

const reload = () => {
  window.location.reload()
}

const Oops = ({ t, errorType }) => (
  <div className='con-error'>
    <h2>{ t(`Error.${errorType}`) }</h2>
    <p>
      <button
        role='button'
        className='coz-btn coz-btn--regular'
        onClick={reload}
      >
        { t('Error.button.reload') }
      </button>
    </p>
  </div>
)

export default translate()(Oops)
