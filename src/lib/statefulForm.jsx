import React, { Component } from 'react'

import { isValidEmail } from './emailHelper'

export default function statefulForm(mapPropsToFormConfig) {
  return function wrapForm(WrappedForm) {
    class StatefulForm extends Component {
      constructor(props) {
        super(props)
        const config = mapPropsToFormConfig
          ? mapPropsToFormConfig(props)
          : props
        this.state = {
          fields: this.configureFields(config),
          dirty: false,
          submit: this.handleSubmit.bind(this),
          oauth: props.onOAuth,
          displayAdvanced: false
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

      configureFields(config) {
        if (!config || !config.fields) return {}

        let fields = {}
        Object.keys(config.fields).forEach(field => {
          let defaut = config.fields[field].default || ''
          let pattern = config.fields[field].pattern || ''
          let value =
            config.values && config.values[field]
              ? config.values[field]
              : defaut
          let options = config.fields[field].options || []
          fields[field] = Object.assign({}, config.fields[field], {
            value: value,
            dirty: false,
            errors: [],
            pattern,
            onInput: event =>
              this.handleChange(
                field,
                event.target ? event.target : { value: event }
              ),
            onChange: event =>
              this.handleChange(
                field,
                event.target ? event.target : { value: event }
              )
          })
          if (typeof value === 'boolean') fields[field].checked = value
          if (fields[field].type === 'dropdown') fields[field].options = options
        })
        return fields
      }

      handleChange(field, target) {
        const { t } = this.context
        let stateUpdate
        let errors = []
        const pattern = this.state.fields[field].pattern
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
        if (target.type && target.type === 'email') {
          if (target.value && !isValidEmail(target.value)) {
            errors.push(
              t('account.message.error.validation', {
                name: t(`account.form.label.${field}`)
              })
            )
          }
        }
        if (pattern) {
          const validation = new RegExp(pattern)
          if (target.value && !validation.test(target.value)) {
            errors.push(
              t('account.message.error.validation', {
                name: t(`account.form.label.${field}`)
              })
            )
          }
        }
        stateUpdate.errors = errors
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            dirty: true,
            errors,
            fields: Object.assign({}, prevState.fields, {
              [field]: Object.assign({}, prevState.fields[field], stateUpdate)
            })
          })
        })
      }

      handleSubmit() {
        if (this.props.onSubmit) {
          return this.props.onSubmit(this.getData())
        }
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
