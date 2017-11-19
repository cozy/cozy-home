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
      placeholder={t('account.form.placeholder.password')}
    />
  ),
  date: () => <Field type="date" />,
  checkbox: () => <CheckboxField />,
  dropdown: () => <DropdownField />,
  text: () => <Field />,
  email: () => <Field type="email" />,
  folder: ({ disableFolderPath }) => (
    <FolderPickerField readOnly={disableFolderPath} />
  )
}

const hydrateFieldValue = {
  checkbox: value => !!value
}

const identity = x => x

const AccountLoginForm = props => {
  const {
    t,
    isOAuth,
    oAuthTerminated,
    fields,
    error,
    dirty,
    isValid,
    submitting,
    forceDisabled,
    forceEnabled,
    values,
    submit,
    connectorSlug,
    isSuccess,
    disableSuccessTimeout,
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
    (dirty && isValid) ||
    (isOAuth && !(isUpdate && hasEditableFields)) ||
    forceEnabled
  const canHandleEnterKey =
    (!isUpdate || hasEditableFields) &&
    !isSuccess &&
    !submitting &&
    submitEnabled
  const onEnterKey = canHandleEnterKey && submit

  const renderField = field => {
    const { name, label, type, value } = field
    if (!renderers[type]) {
      throw new Error('Unknown field type ' + type)
    }
    const readOnly = name === 'login' && isUpdate

    // Give focus only once
    const giveFocus = !alreadyFocused && !readOnly
    if (giveFocus) alreadyFocused = giveFocus

    // Build common fields
    const hydrate = hydrateFieldValue[name] || identity
    const attributes = {
      ...field, // TODO be more restrictive on what comes in
      invalid: !!error,
      onEnterKey,
      giveFocus,
      connectorSlug,
      label: t(`account.form.label.${label || name}`),
      value: isUnloading ? '' : hydrate(value)
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
    <form
      role="form"
      className={styles['account-form-login']}
      onSubmit={submit}
      name={connectorSlug}
    >
      {/* Error */}
      {error && (
        <p className="errors">{t('account.message.error.bad_credentials')}</p>
      )}

      {/* Fields */}
      {!!editableFields && editableFields.map(renderField)}
      {!displayAdvanced &&
        !!advancedFields.length && (
          <button
            type="button"
            className={styles['col-account-form-advanced-button']}
            onClick={toggleAdvanced}
          >
            {t('account.form.button.advanced')}
          </button>
        )}
      {displayAdvanced && !!advancedFields && advancedFields.map(renderField)}

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
            >
              {t(
                isUpdate
                  ? 'account.form.button.save'
                  : 'account.form.button.connect'
              )}
            </button>
          )}
      </div>
    </form>
  )
}

export default statefulForm()(translate()(AccountLoginForm))
