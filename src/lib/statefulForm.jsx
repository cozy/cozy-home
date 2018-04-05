import React, { Component } from 'react'

import advancedFields from '../config/advancedFields'

export default function statefulForm(mapPropsToFormConfig) {
  return function wrapForm(WrappedForm) {
    class StatefulForm extends Component {
      constructor(props, context) {
        super(props)
        const { t } = context
        const config = mapPropsToFormConfig
          ? mapPropsToFormConfig(props)
          : props
        this.state = {
          fields: this.configureFields(
            config,
            t('account.form.placeholder.accountName')
          ),
          dirty: false,
          oauth: props.onOAuth,
          displayAdvanced: false,
          isValid: true,
          isValidButPasswords: true,
          allRequiredFieldsAreFilled: false,
          allRequiredFilledButPasswords: false,
          values: props.values
        }
      }

      componentWillReceiveProps(nextProps) {
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

      configureFields(config = {}, defaultAccountNamePlaceholder) {
        // it will at least have an accountName field
        config.fields = (config.konnector && config.konnector.fields) || {}
        const konnectorName = config.konnector.name
        const accountNamePlaceholder =
          config.fields.accountName && config.fields.accountName.placeholder
        const accountNameField = {
          type: 'text',
          isRequired: false,
          placeholder: accountNamePlaceholder || defaultAccountNamePlaceholder
        }
        const fieldsFromConfig = Object.assign({}, config.fields, {
          accountName: accountNameField
        })

        // Convert custom fields to fields readable by configureFields
        if (Object.keys(fieldsFromConfig).includes('advancedFields')) {
          for (let advancedField in fieldsFromConfig.advancedFields) {
            for (let k in advancedFields[advancedField]) {
              // Assign values from advancedFields, and values from konnectors
              let field = advancedFields[advancedField][k]
              field = Object.assign(
                field,
                fieldsFromConfig.advancedFields[advancedField]
              )
              fieldsFromConfig[k] = field
            }
          }
          delete fieldsFromConfig['advancedFields']
        }

        let fields = {}

        Object.keys(fieldsFromConfig).forEach(field => {
          let defaut = fieldsFromConfig[field].default || ''
          let pattern = fieldsFromConfig[field].pattern || ''
          let maxLength = fieldsFromConfig[field].max || null
          let minLength = fieldsFromConfig[field].min || null
          let isRequired =
            fieldsFromConfig[field].isRequired === undefined
              ? true
              : fieldsFromConfig[field].isRequired
          let value =
            config.values && config.values[field]
              ? config.values[field]
              : defaut
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
          fields.calendar.default = konnectorName
        }

        return fields
      }

      handleBlur(field, target) {
        const { t } = this.context
        const stateFields = this.state.fields
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
        }

        // compute if the form is valid
        const invalidFields = [] // all except passwords
        const invalidPasswords = []
        Object.keys(stateFields).forEach(f => {
          const isErrored =
            (f === field && errors.length) ||
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
          invalidFields.length === 0 && invalidPasswords.length === 0
        const isValidButPasswords = invalidFields.length === 0

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
            fields[field].value &&
            fields[field].value.length === 0
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
            unfilled.length === 0 && unfilledPasswords.length === 0,
          allRequiredFilledButPasswords: unfilled.length === 0,
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
