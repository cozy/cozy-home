import styles from '../styles/field.styl'

import React, { Component, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Input from 'cozy-ui/react/Input'
import statefulComponent from '../lib/statefulComponent'

const Field = props => {
  let inputs
  if (props.children && props.children.length !== 0) {
    inputs = React.Children.toArray(props.children).map(child =>
      cloneElement(
        child,
        Object.assign(props, {
          selected: props.value,
          className: styles['coz-field-input']
        })
      )
    )
  } else {
    const {
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      onInput,
      disabled,
      name,
      noAutoFill,
      isRequired
    } = props
    const autoFill = noAutoFill
      ? type === 'password' ? 'new-password' : 'off'
      : 'on'
    inputs = (
      <Input
        type={type}
        size="medium"
        fullwidth
        placeholder={placeholder}
        disabled={disabled}
        isRequired={isRequired}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onInput={onInput}
        autoComplete={autoFill}
      />
    )
  }
  const { giveFocus } = props
  return props.type === 'hidden' ? (
    inputs
  ) : (
    <FieldWrapper giveFocus={props.type !== 'hidden' && giveFocus} {...props}>
      {inputs}
    </FieldWrapper>
  )
}

export default Field

class FieldWrapperComponent extends Component {
  componentDidMount() {
    if (this.props.giveFocus)
      ReactDOM.findDOMNode(this) // eslint-disable-line
        .querySelector('input')
        .focus()
  }

  handleKeyUp = ev => {
    const key = ev.which || ev.keyCode
    if (key === 13) this.props.onEnterKey()
  }

  render() {
    const { label, invalid, errors, children, type, isRequired, t } = this.props
    const hasErrored = errors.length !== 0 || invalid

    return (
      <div
        className={classNames(
          styles['coz-field'],
          hasErrored && isRequired && styles['coz-field--error']
        )}
        onKeyUp={type !== 'folder' && this.props.onEnterKey && this.handleKeyUp}
      >
        {label && (
          <label>
            {label}
            {!isRequired && (
              <span className={styles['coz-field--optional']}>
                {t('account.config.optional')}
              </span>
            )}
          </label>
        )}
        {children}
        {errors.length !== 0 &&
          errors.map((err, i) => (
            <p key={i} className={styles['coz-field-error']}>
              {err}
            </p>
          ))}
      </div>
    )
  }
}

export const FieldWrapper = translate()(FieldWrapperComponent)

export const PasswordField = translate()(
  statefulComponent(
    {
      visible: false
    },
    setState => ({
      toggleVisibility: () => {
        setState(state => ({ visible: !state.visible }))
      }
    })
  )(props => {
    const {
      t,
      placeholder,
      value,
      onChange,
      onBlur,
      onInput,
      toggleVisibility,
      visible,
      name,
      giveFocus,
      noAutoFill
    } = props
    const autoFill = noAutoFill ? (visible ? 'off' : 'new-password') : 'on'
    return (
      <FieldWrapper giveFocus={props.type !== 'hidden' && giveFocus} {...props}>
        <button
          type="button"
          title={
            visible
              ? t('field.password.visibility.title.hide')
              : t('field.password.visibility.title.show')
          }
          className={styles['password-visibility']}
          onClick={() => toggleVisibility()}
        >
          {visible
            ? t('field.password.visibility.hide')
            : t('field.password.visibility.show')}
        </button>
        <Input
          type={visible ? 'text' : 'password'}
          size="medium"
          fullwidth
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onInput={onInput}
          onBlur={onBlur}
          autoComplete={autoFill}
        />
      </FieldWrapper>
    )
  })
)

export const DropdownField = translate()(props => {
  const { value, options, onChange, onInput } = props
  let valueInOptions = options.indexOf(value) !== -1
  let dropdownFieldOptions = valueInOptions ? options : [value].concat(options)

  return (
    <FieldWrapper {...props}>
      <select
        className={classNames(
          styles['c-select--medium'],
          styles['c-select--fullwidth']
        )}
        value={value}
        onChange={onChange}
        onInput={onInput}
      >
        {dropdownFieldOptions.map((optionValue, i) => (
          <option
            key={i}
            value={optionValue.value || (props.default && props.default.value)}
            selected={optionValue.value === { value }}
          >
            {optionValue.name || (props.default && props.default.name)}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
})

export const CheckboxField = translate()(props => {
  const { value, onChange, onInput, label, errors } = props
  let input = (
    <input
      type="checkbox"
      className={styles['coz-field-input-checkbox']}
      value={value}
      checked={value}
      onChange={onChange}
      onInput={onInput}
    />
  )

  const hasErrored = errors.length > 0

  return (
    <div
      className={classNames(
        styles['coz-field'],
        hasErrored && styles['coz-field--error']
      )}
    >
      {label && (
        <label>
          {input} {label}
        </label>
      )}
      {errors.length !== 0 &&
        errors.map((err, i) => (
          <p key={i} className={styles['coz-field-error']}>
            {err}
          </p>
        ))}
    </div>
  )
})

export const isHidden = field =>
  (field.type && field.type === 'hidden') || field.hidden
export const isAdvanced = field => !!field.advanced
