import styles from '../styles/accountLoginForm'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import Field, {
  PasswordField,
  DropdownField,
  CheckboxField,
  isHidden,
  isAdvanced
} from './Field'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import { map, groupBy } from 'lodash'

const probableLoginFieldNames = [
  'email',
  'identifier',
  'login',
  'new_identifier'
]

const renderers = {
  password: ({ t }) => <PasswordField noAutoFill />,
  date: () => <Field type="date" />,
  checkbox: () => <CheckboxField />,
  dropdown: () => <DropdownField />,
  text: () => <Field />,
  email: () => <Field type="email" />
}

const hydrateFieldValue = {
  checkbox: value => !!value
}

const identity = x => x

export class AccountLoginForm extends React.Component {
  state = {
    submitEnabled: this.props.isOAuth || false
  }
  componentWillReceiveProps(newProps) {
    const {
      dirty,
      editing,
      isValid,
      isValidButPasswords,
      allRequiredFieldsAreFilled,
      allRequiredFilledButPasswords,
      forceEnabled,
      isOAuth
    } = newProps
    // we don't take in account passwords in editing
    // since they will be returned encrypted from the stack
    const submitEnabled =
      (editing &&
        dirty &&
        isValidButPasswords &&
        allRequiredFilledButPasswords) ||
      (!editing && isValid && allRequiredFieldsAreFilled) ||
      forceEnabled ||
      isOAuth
    this.setState({
      submitEnabled: submitEnabled
    })
  }
  render() {
    const {
      t,
      isOAuth,
      oAuthTerminated,
      fields,
      error,
      editing,
      submitting,
      onSubmit,
      connectorSlug,
      isSuccess,
      disableSuccessTimeout,
      isUnloading,
      displayAdvanced,
      toggleAdvanced
    } = this.props
    const { submitEnabled } = this.state

    let alreadyFocused = false
    // Handle advanced vs simple fields
    const fieldSpecs = map(fields, (fieldSpec, name) => ({
      ...fieldSpec,
      name
    }))
    const visibleFields = fieldSpecs.filter(field => !isHidden(field))
    const grouped = groupBy(
      visibleFields,
      field => (isAdvanced(field) ? 'advancedFields' : 'editableFields')
    )
    const editableFields = grouped.editableFields || []
    const advancedFields = grouped.advancedFields || []
    const hasEditableFields = !!editableFields.length

    const canHandleEnterKey =
      (!editing || hasEditableFields) &&
      !isSuccess &&
      !submitting &&
      submitEnabled
    const onEnterKey = canHandleEnterKey && onSubmit

    const renderField = field => {
      const { name, label, type, value, placeholder } = field
      if (!renderers[type]) {
        throw new Error('Unknown field type ' + type)
      }
      const disabled = probableLoginFieldNames.includes(name) && editing

      // Give focus only once
      const giveFocus = !alreadyFocused && !disabled
      if (giveFocus) alreadyFocused = giveFocus

      const readonly =
        submitting &&
        !disableSuccessTimeout &&
        (editing || !isOAuth || oAuthTerminated)

      // Build common fields
      const hydrate = hydrateFieldValue[name] || identity
      const attributes = {
        ...field, // TODO be more restrictive on what comes in
        disabled: disabled || readonly,
        invalid: !!error,
        onEnterKey,
        giveFocus,
        label: t(`account.form.label.${label || name}`),
        readonly: readonly,
        value: isUnloading ? '' : hydrate(value),
        placeholder: placeholder
      }
      return (
        <div>
          {field.hasDescription && (
            <ReactMarkdownWrapper
              source={t(`connector.${connectorSlug}.description.field.${name}`)}
            />
          )}
          {React.cloneElement(renderers[type](this.props), attributes)}
        </div>
      )
    }

    return (
      // We use a <div> instead of a <form> to disable the "use password for" function of Chrome
      <div className={styles['account-form-login']} role="form">
        {/* Error */}
        {error && (
          <p className="errors">{t('account.message.error.bad_credentials')}</p>
        )}

        {/* Fields */}
        {!!editableFields &&
          !!editableFields.length && (
            <fieldset className={styles['account-form-fieldset']}>
              {editableFields.map(renderField)}
            </fieldset>
          )}
        {!editing &&
          !displayAdvanced &&
          !!advancedFields.length && (
            <button
              type="button"
              className={styles['col-account-form-advanced-button']}
              onClick={toggleAdvanced}
            >
              {t('account.form.button.advanced')}
            </button>
          )}

        {!editing &&
          displayAdvanced &&
          !!advancedFields &&
          !!advancedFields.length && (
            <fieldset className={styles['account-form-fieldset']}>
              {advancedFields.map(renderField)}
            </fieldset>
          )}

        {/* Controls */}
        <div className={styles['coz-form-controls']}>
          {(!editing || hasEditableFields) &&
            !isSuccess && (
              <Button
                className={styles['coz-btn']}
                disabled={oAuthTerminated || submitting || !submitEnabled}
                busy={
                  submitting &&
                  !disableSuccessTimeout &&
                  (editing || !isOAuth || oAuthTerminated)
                }
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
