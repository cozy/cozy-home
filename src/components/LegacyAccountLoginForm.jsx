import styles from '../styles/accountLoginForm'
import fieldStyles from '../styles/field.styl'

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
import { probableLoginFieldNames } from '../lib/accounts'
import collectConfig from 'config/collect'

const renderers = {
  // eslint-disable-next-line react/display-name
  password: () => <PasswordField noAutoFill />,
  // eslint-disable-next-line react/display-name
  date: ({ t }) => (
    <Field
      type="date"
      placeholder={t('date.placeholder', {
        _: collectConfig.defaultDateFormat.toLowerCase()
      })}
    />
  ),
  // eslint-disable-next-line react/display-name
  checkbox: () => <CheckboxField />,
  // eslint-disable-next-line react/display-name
  dropdown: () => <DropdownField />,
  // eslint-disable-next-line react/display-name
  text: () => <Field />,
  // eslint-disable-next-line react/display-name
  email: () => <Field type="email" />
}

const hydrateFieldValue = {
  checkbox: value => !!value
}

const identity = x => x

const FieldDescription = props => {
  const { field, konnectorSlug, t } = props
  const hasLegacyDescription = field.hasDescription
  const descriptionKey =
    (hasLegacyDescription &&
      `connector.${konnectorSlug}.description.field.${field.name}`) ||
    (!!field.description && `${konnectorSlug}.${field.description}`)
  if (!descriptionKey) return null
  return <ReactMarkdownWrapper source={t(descriptionKey)} />
}

export class AccountLoginForm extends React.Component {
  state = {
    submitEnabled: this.props.isOAuth || false
  }

  componentWillReceiveProps(props) {
    this.UNSAFE_componentWillReceiveProps(props)
  }

  UNSAFE_componentWillReceiveProps(newProps) {
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

    const renderField = konnectorSlug => field => {
      const { name, label, type, value, placeholder } = field
      if (!renderers[type]) {
        // eslint-disable-next-line no-console
        console.warn('Unknown field type ' + type)
        return null
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
        label: t(`${konnectorSlug}.fields.${field.name}.label`, {
          _: t(`account.form.label.${label || name}`)
        }),
        readonly: readonly,
        value: isUnloading ? '' : hydrate(value)
      }

      if (placeholder) {
        attributes.placeholder = placeholder
      }

      return (
        <div className={fieldStyles['coz-field-wrapper']}>
          <FieldDescription field={field} konnectorSlug={connectorSlug} t={t} />
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
              {editableFields.map(renderField(connectorSlug))}
            </fieldset>
          )}
        {editing &&
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

        {editing &&
          displayAdvanced &&
          !!advancedFields &&
          !!advancedFields.length && (
            <fieldset className={styles['account-form-fieldset']}>
              {advancedFields.map(renderField(connectorSlug))}
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
