import React from 'react'

import { translate } from 'cozy-ui/react/I18n'

import ReactMarkdownWrapper from './ReactMarkdownWrapper'

import styles from '../styles/konnectorMaintenance'

const KonnectorMaintenance = ({ t, maintenance, lang }) => (
  <div className={styles['maintenance']}>
    <div className={styles['maintenance-intro']}>
      <div className={styles['maintenance-icon']} />
      <h3 className={styles['maintenance-service']}>
        {t('maintenance.service')}
      </h3>
      <p className={styles['maintenance-problem']}>
        {t('maintenance.problem')}
      </p>
    </div>
    <h4 className={styles['maintenance-title']}>{t('maintenance.title')}</h4>
    <ReactMarkdownWrapper
      className={styles['maintenance-message']}
      source={maintenance.message[lang] || maintenance.message['en']}
    />
  </div>
)

export default translate()(KonnectorMaintenance)
