import styles from '../styles/accountLoginForm'

import React from 'react'
import classNames from 'classnames'
import statefulForm from '../lib/statefulForm'
import { translate } from 'cozy-ui/react/I18n'
import Field, {
  PasswordField,
  DropdownField,
  CheckboxField,
  isHidden,
  isAdvanced,
  FolderPickerField
} from './Field'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import { map, groupBy } from 'lodash'

const renderers = {
  password: ({ t }) => (
    <PasswordField
      noAutoFill
    />
  ),
  date: () => <Field type="date" />,
  checkbox: () => <CheckboxField />,
  dropdown: () => <DropdownField />,
  text: () => <Field />,
  email: () => <Field type="email" />,
  folder: ({ disableFolderPath }) => (
    <FolderPickerField disabled={disableFolderPath} />
  )
}

const hydrateFieldValue = {
  checkbox: value => !!value
}

const identity = x => x

export const AccountLoginForm = props => {
  const {
    t,
    isOAuth,
    oAuthTerminated,
    fields,
    error,
    dirty,
    isValid,
    allRequiredFieldsAreFilled,
    submitting,
    forceDisabled,
    forceEnabled,
    values,
    submit,
    connectorSlug,
    konnectorName,
    isSuccess,
    disableSuccessTimeout,
    disableFolderPath,
    isUnloading,
    displayAdvanced,
    toggleAdvanced
  } = props
  const isUpdate = !!values && Object.keys(values).length > 0
  let alreadyFocused = false

  // Handle advanced vs simple fields
  const fieldSpecs = map(fields, (fieldSpec, name) => ({ ...fieldSpec, name }))
  const visibleFields = fieldSpecs.filter(field => !isHidden(field))
  const grouped = groupBy(
    visibleFields,
    field => (isAdvanced(field) ? 'advancedFields' : 'editableFields')
  )
  const editableFields = grouped.editableFields || []
  const advancedFields = grouped.advancedFields || []
  const hasEditableFields = !!editableFields.length

  // Submit button state
  const submitEnabled =
    (dirty && isValid && allRequiredFieldsAreFilled) ||
    (isOAuth && !(isUpdate && hasEditableFields)) ||
    forceEnabled
  const canHandleEnterKey =
    (!isUpdate || hasEditableFields) &&
    !isSuccess &&
    !submitting &&
    submitEnabled
  const onEnterKey = canHandleEnterKey && submit

  const renderField = field => {
    const { name, label, type, value, placeholder } = field
    if (!renderers[type]) {
      throw new Error('Unknown field type ' + type)
    }
    const disabled = name === 'login' && isUpdate

    let fieldPlaceholder = null
    switch (name) {
      case 'pathName':
        fieldPlaceholder = konnectorName
        break
      case 'password':
        fieldPlaceholder = t('account.form.placeholder.password')
        break
      default:
        fieldPlaceholder = placeholder || null
    }
    // Give focus only once
    const giveFocus = !alreadyFocused && !disabled
    if (giveFocus) alreadyFocused = giveFocus

    // Build common fields
    const hydrate = hydrateFieldValue[name] || identity
    const attributes = {
      ...field, // TODO be more restrictive on what comes in
      invalid: !!error,
      onEnterKey,
      giveFocus,
      label: t(`account.form.label.${label || name}`),
      value: isUnloading ? '' : hydrate(value),
      placeholder: fieldPlaceholder
    }
    return (
      <div>
        {field.hasDescription && (
          <ReactMarkdownWrapper
            source={t(`connector.${connectorSlug}.description.field.${name}`)}
          />
        )}
        {React.cloneElement(renderers[type](props), attributes)}
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
      {!displayAdvanced &&
        !disableFolderPath &&
        !!advancedFields.length && (
          <button
            type="button"
            className={styles['col-account-form-advanced-button']}
            onClick={toggleAdvanced}
          >
            {t('account.form.button.advanced')}
          </button>
        )}

      {displayAdvanced &&
        !!advancedFields &&
        !!advancedFields.length && (
          <fieldset className={styles['account-form-fieldset']}>
            {advancedFields.map(renderField)}
          </fieldset>
        )}

      {/* Controls */}
      <div className={styles['coz-form-controls']}>
        {(!isUpdate || hasEditableFields) &&
          !isSuccess && (
            <button
              className={classNames(
                'coz-btn',
                'coz-btn--regular',
                styles['coz-btn']
              )}
              disabled={forceDisabled || submitting || !submitEnabled}
              aria-busy={
                submitting &&
                !disableSuccessTimeout &&
                (isUpdate || !isOAuth || oAuthTerminated)
                  ? 'true'
                  : 'false'
              }
              onClick={submit}
            >
              {t(
                isUpdate
                  ? 'account.form.button.save'
                  : 'account.form.button.connect'
              )}
            </button>
          )}
      </div>
    </div>
  )
}

export default statefulForm()(translate()(AccountLoginForm))
