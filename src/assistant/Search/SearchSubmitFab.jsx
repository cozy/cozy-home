import React from 'react'

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PaperplaneIcon from 'cozy-ui/transpiled/react/Icons/Paperplane'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import { getFlagshipMetadata } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const useStyles = makeStyles({
  root: {
    right: '1rem',
    bottom: '1rem',
    position: 'fixed',
    marginBottom: ({ immersive }) =>
      immersive ? 'var(--flagship-bottom-height)' : 0
  }
})

const SearchSubmitFab = ({ searchValue, onClick }) => {
  const { t } = useI18n()
  const styles = useStyles({ immersive: getFlagshipMetadata().immersive })

  return (
    <Fab
      aria-label={t('assistant.search.send')}
      color="primary"
      size="medium"
      classes={styles}
      disabled={!searchValue}
      onClick={onClick}
    >
      <Icon icon={PaperplaneIcon} />
    </Fab>
  )
}

export default SearchSubmitFab
