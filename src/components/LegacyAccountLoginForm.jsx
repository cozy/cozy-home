import React from 'react'
import { Button } from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import styles from 'styles/accountLoginForm'

/**
 * AccountLoginForm is now aimed to deal only with OAuth konnectors
 * @type {Object}
 */
export class AccountLoginForm extends React.Component {
  render() {
    const {
      t,
      oAuthTerminated,
      error,
      editing,
      submitting,
      onSubmit
    } = this.props

    return (
      // We use a <div> instead of a <form> to disable the "use password for" function of Chrome
      <div className={styles['account-form-login']} role="form">
        {/* Error */}
        {error && (
          <p className="errors">{t('account.message.error.bad_credentials')}</p>
        )}
        {/* Controls */}
        <div className={styles['coz-form-controls']}>
          {!editing && (
            <Button
              className={styles['coz-btn']}
              disabled={!!oAuthTerminated || !!submitting}
              busy={submitting && (editing || oAuthTerminated)}
              onClick={onSubmit}
            >
              {t(
                editing
                  ? 'account.form.button.save'
                  : 'account.form.button.connect'
              )}
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default translate()(AccountLoginForm)
