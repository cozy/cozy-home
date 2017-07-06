import styles from '../styles/accountLoginForm'

import React from 'react'
import classNames from 'classnames'
import statefulForm from '../lib/statefulForm'
import { translate } from 'cozy-ui/react/I18n'
import Field, { PasswordField, DropdownField, CheckboxField } from './Field'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import FixedProgress from './FixedProgress'

const AccountLoginForm = ({ t, isOAuth, oAuthTerminated, fields, error, dirty, submitting, forceEnabled, deleting, values, submit, onDelete, onCancel, connectorSlug, isSuccess, onAccountConfig, disableSuccessTimeout, isUnloading, giveFocus = true }) => {
  const isUpdate = !!values && Object.keys(values).length > 0
  const submitEnabled = dirty || isOAuth || forceEnabled
  let hasFocused = !giveFocus

  return (
    <form className={styles['account-form-login']} >
      {error &&
        <p className='errors'>
          {t('account.message.error.bad_credentials')}
        </p>
      }
      {!!fields && Object.keys(fields)
        .filter(name => !fields[name].advanced)
        .map(name => {
          const inputName = `${name}_${connectorSlug}`
          const description = fields[name].hasDescription
            ? <ReactMarkdownWrapper source={t(`connector.${connectorSlug}.description.field.${name}`)} />
            : ''
          const readOnly = name === 'login' && isUpdate

          let fieldReact
          switch (fields[name].type) {
            case 'password':
              fieldReact = <div>
                {description}
                <PasswordField
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  placeholder={t('account.form.placeholder.password')}
                  invalid={!!error}
                  giveFocus={!hasFocused}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
              break
            case 'dropdown':
              fieldReact = <div>
                {description}
                <DropdownField
                  label={t(`account.form.label.${name}`)}
                  giveFocus={!hasFocused}
                  {...fields[name]} />
              </div>
              break
            case 'checkbox':
              fieldReact = <div>
                {description}
                <CheckboxField
                  label={t(`account.form.label.${name}`)}
                  giveFocus={!hasFocused}
                  {...fields[name]} />
              </div>
              break
            default:
              fieldReact = <div>
                {description}
                <Field
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  giveFocus={!hasFocused && !readOnly}
                  readOnly={readOnly}
                  invalid={!!error}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
          }

          if (!hasFocused && !readOnly) {
            hasFocused = true
          }

          return fieldReact
        }
      )}
      { isUpdate &&
        <div className={styles['col-account-form-delete']}>
          <h4>{t('account.disconnect.title')}</h4>
          <p>
            {t('account.disconnect.description')}
          </p>
          <button
            className={classNames('coz-btn', 'coz-btn--danger-outline', styles['coz-btn'])}
            disabled={deleting}
            aria-busy={deleting}
            onClick={onDelete}>
            {t('account.form.button.disconnect')}
          </button>
        </div>
      }
      <div className={styles['coz-form-controls']}>
        { isUpdate && !isOAuth &&
          <button
            className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
            onClick={onCancel}
          >
            {t('account.form.button.cancel')}
          </button>
        }
        { (!(isUpdate && isOAuth) && !isSuccess) &&
          <button
            className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
            disabled={submitting || !submitEnabled}
            aria-busy={submitting && disableSuccessTimeout ? 'true' : 'false'}
            onClick={submit}
          >
            {t(isUpdate ? 'account.form.button.save' : 'account.form.button.connect')}
          </button>
        }
        { submitting && !disableSuccessTimeout && (!isOAuth || oAuthTerminated) &&
          <FixedProgress duration='32000' />
        }
      </div>
    </form>
  )
}

export default statefulForm()(translate()(AccountLoginForm))
