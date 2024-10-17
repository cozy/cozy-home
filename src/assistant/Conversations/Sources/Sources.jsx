import React, { useMemo, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Chip from 'cozy-ui/transpiled/react/Chips'
import MultiFilesIcon from 'cozy-ui/transpiled/react/Icons/MultiFiles'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import Box from 'cozy-ui/transpiled/react/Box'
import Grow from 'cozy-ui/transpiled/react/Grow'

import AssistantIcon from 'assets/images/icon-assistant.png'

import SourcesItem from './SourcesItem'

const Sources = () => {
  const [showSources, setShowSources] = useState(false)
  const { t } = useI18n()

  const sourcesCount = 2

  const handleShowSources = () => setShowSources(v => !v)
  const sources = [{ _id: 1 }, { _id: 2 }]

  return (
    <Box className="u-mt-1-half" pl="44px">
      <Chip
        className="u-mb-1"
        icon={<Icon icon={MultiFilesIcon} className="u-ml-half" />}
        label={t('assistant.sources', sourcesCount)}
        deleteIcon={
          <Icon
            className="u-h-1"
            icon={RightIcon}
            rotate={showSources ? 90 : 0}
          />
        }
        clickable
        onClick={handleShowSources}
        onDelete={handleShowSources}
      />
      <Grow
        in={showSources}
        style={{ transformOrigin: '0 0 0' }}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div>
          {sources.map(source => (
            <SourcesItem key={source._id} />
          ))}
        </div>
      </Grow>
    </Box>
  )
}

export default Sources
