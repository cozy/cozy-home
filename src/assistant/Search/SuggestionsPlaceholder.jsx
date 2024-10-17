import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { useTimeoutWhen } from 'rooks'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import styles from './styles.styl'

const SuggestionsPlaceholder = () => {
  const { t } = useI18n()
  const [showSuggestions, setShowSuggestions] = useState(false)

  useTimeoutWhen(() => setShowSuggestions(true), 2500)

  return (
    <div className={styles['suggestionsPlaceholder']}>
      <Typography>
        {showSuggestions ? (
          <TypeAnimation
            cursor={false}
            sequence={[
              t('assistant.suggestions.find_file'),
              2500,
              t('assistant.suggestions.reimbursements'),
              2500,
              t('assistant.suggestions.reorganise_files'),
              2500
            ]}
            speed={40}
            repeat={Infinity}
            omitDeletionAnimation
          />
        ) : (
          t('assistant.search.placeholder')
        )}
      </Typography>
    </div>
  )
}

export default SuggestionsPlaceholder
