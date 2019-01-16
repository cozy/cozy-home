import React, { Component } from 'react'
import cx from 'classnames'

import { translate } from 'cozy-ui/react/I18n'
import Button from 'cozy-ui/react/Button'
import { SubTitle } from 'cozy-ui/react/Text'

import styles from '../styles/updateMessage'

export class UpdateMessage extends Component {
  render() {
    const { onClick, disabled, t, isBlocking } = this.props
    return (
      <div
        className={cx(
          styles['col-konnector-update'],
          isBlocking ? styles['col-konnector-update--error'] : ''
        )}
      >
        <SubTitle className={isBlocking ? 'u-pomegranate' : ''}>
          {t('update.title')}
        </SubTitle>
        <p>{isBlocking ? t('update.blocking') : t('update.regular')}</p>
        <Button
          label={t('update.CTA')}
          theme={isBlocking ? 'danger' : 'secondary'}
          className="u-m-0"
          onClick={onClick}
          disabled={disabled}
          icon="eye"
        />
      </div>
    )
  }
}

export default translate()(UpdateMessage)
