import styles from '../styles/accountLoginForm'

import React from 'react'
import classNames from 'classnames'
import statefulForm from '../lib/statefulForm'
import { translate } from 'cozy-ui/react/I18n'
import Field, { PasswordField, DropdownField, CheckboxField } from './Field'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'

const AccountLoginForm = ({ t, isOAuth, oAuthTerminated, fields, error, dirty, submitting, forceEnabled, values, submit, connectorSlug, isSuccess, disableSuccessTimeout, isUnloading }) => {
  const isUpdate = !!values && Object.keys(values).length > 0
  const submitEnabled = dirty || isOAuth || forceEnabled
  let alreadyFocused = false
  return (
    <div className={styles['account-form-login']}>
      {error &&
        <p className='errors'>
          {t('account.message.error.bad_credentials')}
        </p>
      }
      {!!fields && Object.keys(fields)
        .filter(name => !fields[name].advanced)
        .map((name, idx) => {
          const readOnly = name === 'login' && isUpdate
          const giveFocus = !alreadyFocused && !readOnly
          if (giveFocus) alreadyFocused = giveFocus
          const inputName = `${name}_${connectorSlug}`
          const description = fields[name].hasDescription
            ? <ReactMarkdownWrapper source={t(`connector.${connectorSlug}.description.field.${name}`)} />
            : ''
          const onEnterKey = () => {
            if ((!(isUpdate && isOAuth) && !isSuccess) && !submitting && submitEnabled) submit()
          }
          switch (fields[name].type) {
            case 'password':
              return <div>
                {description}
                <PasswordField
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  placeholder={t('account.form.placeholder.password')}
                  invalid={!!error}
                  giveFocus={giveFocus}
                  onEnterKey={onEnterKey}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
            case 'dropdown':
              return <div>
                {description}
                <DropdownField label={t(`account.form.label.${name}`)} {...fields[name]} />
              </div>
            case 'checkbox':
              // force boolean type here since it's just a checkbox
              fields[name].value = !!fields[name].value
              return <div>
                {description}
                <CheckboxField label={t(`account.form.label.${name}`)} {...fields[name]} />
              </div>
            default:
              return <div>
                {description}
                <Field
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  readOnly={readOnly}
                  invalid={!!error}
                  giveFocus={giveFocus && !readOnly}
                  onEnterKey={onEnterKey}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
          }
        }
      )}

      <div className={styles['coz-form-controls']}>
        { (!(isUpdate && isOAuth) && !isSuccess) &&
          <button
            className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
            disabled={submitting || !submitEnabled}
            aria-busy={submitting && !disableSuccessTimeout && (!isOAuth || oAuthTerminated) ? 'true' : 'false'}
            onClick={submit}
          >
            {t(isUpdate ? 'account.form.button.save' : 'account.form.button.connect')}
          </button>
        }
      </div>
    </div>
  )
}

export default statefulForm()(translate()(AccountLoginForm))
