import React from 'react'

import SquareAppIcon from 'cozy-ui-plus/dist/SquareAppIcon'
import { AssistantLink } from 'cozy-search'
import Icon from 'cozy-ui/transpiled/react/Icon'
import AssistantIcon from 'cozy-ui/transpiled/react/Icons/Assistant'

/**
 * AssistantTile component.
 *
 * @returns {JSX.Element} The rendered AssistantTile component.
 */
const AssistantTile = () => {
  return (
    <AssistantLink>
      {({ openAssistant }) => (
        <a onClick={openAssistant} className="scale-hover">
          <SquareAppIcon
            name="Assistant"
            IconContent={
              <Icon
                icon={AssistantIcon}
                size={24}
                color="var(--primaryColor)"
              />
            }
          />
        </a>
      )}
    </AssistantLink>
  )
}

export default AssistantTile
