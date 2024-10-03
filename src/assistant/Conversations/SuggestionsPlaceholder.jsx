import React from 'react'
import { TypeAnimation } from 'react-type-animation'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import styles from './styles.styl'

const SuggestionsPlaceholder = ({ inputValue }) => {
  const { t } = useI18n()

  if (inputValue) return null

  return (
    <div className={styles['conversationSearchBar-input--startAdornment']}>
      <Typography>
        <TypeAnimation
          cursor={false}
          sequence={[
            t('assistant.suggestions.find_file'),
            1500,
            t('assistant.suggestions.reimbursements'),
            1500,
            t('assistant.suggestions.reorganise_files'),
            1500
          ]}
          speed={40}
          repeat={Infinity}
          omitDeletionAnimation
        />
      </Typography>
    </div>
  )
}

export default SuggestionsPlaceholder
