import React, { useState } from 'react'

import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import AssistantIcon from 'assets/icons/icon-assistant.svg'

import AssistantDialog from './AssistantDialog'

const AssistantBar = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const [showDialog, setShowDialog] = useState(false)

  const props = isMobile
    ? { size: 'medium', iconClassName: 'u-ml-1 u-mr-half', iconSize: 24 }
    : { size: 'large', iconClassName: 'u-mh-1', iconSize: 32 }

  return (
    <>
      <SearchBar
        size={props.size}
        icon={
          <Icon
            className={props.iconClassName}
            icon={AssistantIcon}
            size={props.iconSize}
          />
        }
        type="button"
        label={t('assistant.search.placeholder')}
        onClick={() => setShowDialog(true)}
      />
      {showDialog && (
        <AssistantDialog
          onClose={() => {
            setShowDialog(false)
          }}
        />
      )}
    </>
  )
}

export default AssistantBar
