import React, { Component } from 'react'
import collectConfig from 'config/collect'
import moment from 'moment'

// From https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
const hasDateInputSupport = () => {
  let hasSupport
  return (function() {
    if (typeof hasSupport === 'undefined') {
      const input = document.createElement('input')
      input.setAttribute('type', 'date')
      const notADateValue = 'not-a-date'
      input.setAttribute('value', notADateValue)
      hasSupport = input.value !== notADateValue
    }
    return hasSupport
  })()
}

export default function statefulForm(mapPropsToFormConfig) {
  return function wrapForm(WrappedForm) {
    class StatefulForm extends Component {
      constructor(props, context) {
        super(props)
        const { t } = context
        const config = mapPropsToFormConfig
          ? mapPropsToFormConfig(props)
          : props
        this.setState({
          fields: this.configureFields(
            config,
            t('account.form.placeholder.accountName'),
            t('date.format', { _: collectConfig.defaultDateFormat })
          ),
          dirty: false,
          oauth: props.onOAuth,
          displayAdvanced: false,
          isValid: true,
          isValidButPasswords: true,
          allRequiredFieldsAreFilled: false,
          allRequiredFilledButPasswords: false,
          values: props.values
        })
      }

      UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.values !== this.props.values) {
          this.assignValues(nextProps.values)
        }
        if (nextProps.errors !== this.props.errors) {
          const errors = nextProps.errors
          if (typeof errors === 'object' && Object.keys(errors).length !== 0) {
            this.assignErrors(errors)
          }
        }
      }

      render() {
        return (
          <WrappedForm
            {...this.props}
            {...this.state}
            toggleAdvanced={() => this.toggleAdvanced()}
          />
        )
      }

      toggleAdvanced() {
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            displayAdvanced: !prevState.displayAdvanced
          })
        })
      }

      assignValues(values) {
        this.setState(prevState => {
          let updated = {}
          Object.keys(values).forEach(key => {
            if (prevState.fields[key]) {
              updated[key] = Object.assign({}, prevState.fields[key], {
                value: values[key],
                dirty: false,
                errors: []
              })
            }
          })
          return Object.assign({}, prevState, {
            fields: Object.assign({}, prevState.fields, updated),
            dirty: false
          })
        })
      }

      assignErrors(errors) {
        this.setState(prevState => {
          let updated = {}
          Object.keys(errors).forEach(key => {
            if (prevState.fields[key]) {
              updated[key] = Object.assign({}, prevState.fields[key], {
                errors: errors[key]
              })
            }
          })
          return Object.assign({}, prevState, {
            fields: Object.assign({}, prevState.fields, updated)
          })
        })
      }

      configureFields(config = {}, defaultAccountNamePlaceholder, dateFormat) {
        // it will at least have an accountName field
        const configFields = (config.konnector && config.konnector.fields) || {}

        // account name field added by the application
        const accountNamePlaceholder =
          configFields.accountName && configFields.accountName.placeholder
        const accountNameField = {
          type: 'text',
          advanced: true,
          isRequired: false,
          placeholder: accountNamePlaceholder || defaultAccountNamePlaceholder
        }

        const fieldsFromConfig = Object.assign({}, configFields, {
          accountName: accountNameField
        })

        // LEGACY: turn advancedFields to fields with advanced: true
        if (fieldsFromConfig.advancedFields) {
          for (let fieldName in fieldsFromConfig.advancedFields) {
            fieldsFromConfig[fieldName] = Object.assign(
              {},
              fieldsFromConfig.advancedFields[fieldName],
              { advanced: true }
            )
          }
          delete fieldsFromConfig.advancedFields
        }

        let fields = {}

        Object.keys(fieldsFromConfig).forEach(field => {
          let defaut = fieldsFromConfig[field].default || ''
          let pattern = fieldsFromConfig[field].pattern || ''
          let maxLength = fieldsFromConfig[field].max || null
          let minLength = fieldsFromConfig[field].min || null
          let isRequired =
            typeof fieldsFromConfig[field].isRequired === 'undefined'
              ? true
              : fieldsFromConfig[field].isRequired
          let value =
            config.values && config.values[field]
              ? config.values[field]
              : defaut
          if (
            fieldsFromConfig[field].type === 'date' &&
            !hasDateInputSupport()
          ) {
            value = value && moment(value).format(dateFormat)
          }
          let options = fieldsFromConfig[field].options || []
          fields[field] = Object.assign({}, fieldsFromConfig[field], {
            value: value,
            dirty: false,
            errors: [],
            pattern,
            max: maxLength,
            min: minLength,
            isRequired,
            onInput: event =>
              this.handleChange(
                field,
                event.target ? event.target : { value: event }
              ),
            onChange: event =>
              this.handleChange(
                field,
                event.target ? event.target : { value: event }
              ),
            onBlur: event =>
              this.handleBlur(
                field,
                event.target ? event.target : { value: event }
              )
          })
          if (typeof value === 'boolean') fields[field].checked = value
          if (fields[field].type === 'dropdown') fields[field].options = options
        })
        // Set default values for advanced fields that will not be shown
        // on the initial connection form
        if (fields.calendar && !fields.calendar.default) {
          fields.calendar.default = config.konnector.name
        }

        return fields
      }

      handleBlur(field, target) {
        const { t } = this.context
        const stateFields = this.state.fields
        const isDate = stateFields[field].type === 'date'
        const localeFormat = t('date.format', {
          _: collectConfig.defaultDateFormat
        })
        const value = stateFields[field].value
        const pattern = stateFields[field].pattern || ''
        const patternRx = pattern && new RegExp(pattern)
        const maxLength = stateFields[field].max
        const minLength = stateFields[field].min
        const errors = []
        if (
          maxLength &&
          minLength &&
          maxLength === minLength &&
          value &&
          value.length !== maxLength
        ) {
          errors.push(t('validation.exact_length', { length: maxLength }))
        } else if (maxLength && value.length > maxLength) {
          errors.push(t('validation.max_length', { length: maxLength }))
        } else if (minLength && value.length < minLength) {
          errors.push(t('validation.min_length', { length: minLength }))
        } else if (patternRx && !patternRx.test(value)) {
          errors.push(t('validation.pattern', { pattern }))
        } else if (target.validationMessage) {
          errors.push(target.validationMessage)
        } else if (
          isDate &&
          !hasDateInputSupport() &&
          !moment(value, localeFormat, true).isValid()
        ) {
          errors.push(target.validationMessage)
        }

        // compute if the form is valid
        const invalidFields = [] // all except passwords
        const invalidPasswords = []
        Object.keys(stateFields).forEach(f => {
          const isErrored =
            (f === field && errors && errors.length) ||
            (f !== field &&
              stateFields[f].errors &&
              stateFields[f].errors.length)
          if (isErrored) {
            // TODO use the next line instead when the stack will be
            // able to encrypt many fields
            // if (stateFields[f].type === 'password') {
            if (f === 'password') {
              invalidPasswords.push(f)
            } else {
              invalidFields.push(f)
            }
          }
        })
        const isValid =
          invalidFields &&
          invalidFields.length === 0 &&
          invalidPasswords &&
          invalidPasswords.length === 0
        const isValidButPasswords = invalidFields && invalidFields.length === 0

        this.setState(prevState => {
          // check and update accountName placeholder
          let accountNameUpdate = {}
          const { login, identifier } = prevState.fields
          const shouldChangeNamePlaceholder =
            (login && field === 'login') ||
            (!login && field === 'identifier') ||
            (!login && !identifier && field === 'email')
          if (shouldChangeNamePlaceholder) {
            accountNameUpdate = {
              placeholder:
                target.value || t('account.form.placeholder.accountName')
            }
          }
          return Object.assign({}, prevState, {
            isValid,
            isValidButPasswords,
            fields: Object.assign({}, prevState.fields, {
              [field]: Object.assign({}, prevState.fields[field], { errors }),
              accountName: Object.assign(
                {},
                prevState.fields.accountName,
                accountNameUpdate
              )
            })
          })
        })
      }

      handleChange(field, target) {
        let stateUpdate
        if (target.type && target.type === 'checkbox') {
          stateUpdate = {
            dirty: true,
            value: target.checked,
            checked: target.checked
          }
        } else {
          stateUpdate = {
            dirty: true,
            value: target.value
          }
        }
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            dirty: true,
            fields: Object.assign({}, prevState.fields, {
              [field]: Object.assign({}, prevState.fields[field], stateUpdate)
            })
          })
        })

        // Check if all required inputs are filled
        let unfilled = [] // all except passwords
        let unfilledPasswords = []
        const { fields } = this.state
        for (field in fields) {
          const isRequiredAndEmpty =
            fields[field].isRequired &&
            fields[field].type !== 'hidden' &&
            !fields[field].value
          if (isRequiredAndEmpty) {
            // TODO use the next line instead when the stack will be
            // able to encrypt many fields
            // if (fields[field].type === 'password') {
            if (field === 'password') {
              unfilledPasswords.push(field)
            } else {
              unfilled.push(field)
            }
          }
        }
        this.setState({
          allRequiredFieldsAreFilled:
            unfilled &&
            unfilledPasswords &&
            unfilled.length === 0 &&
            unfilledPasswords.length === 0,
          allRequiredFilledButPasswords: unfilled && unfilled.length === 0,
          values: this.getData()
        })
      }

      getData() {
        const data = {}
        Object.keys(this.state.fields).forEach(field => {
          data[field] = this.state.fields[field].value
        })
        return data
      }
    }

    return StatefulForm
  }
}
