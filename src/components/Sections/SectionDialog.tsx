import React, { useState } from 'react'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

import { SectionDialogProps } from 'components/Sections/SectionsTypes'
import { SectionBody } from 'components/Sections/SectionView'
import { SectionHeader } from 'components/Sections/SectionHeader'

const SectionDialog = ({
  hasDialog,
  ...props
}: SectionDialogProps): JSX.Element | null => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const section = props.sections.find(section => section.id === hasDialog)

  if (!section) return null

  return (
    <CozyTheme variant="normal">
      <Dialog
        content={<SectionBody section={section} />}
        fullScreen={false}
        open
        size="large"
        title={
          <SectionHeader
            section={section}
            anchorRef={anchorRef}
            toggleMenu={toggleMenu}
            menuState={menuState}
          />
        }
        {...props}
      />
    </CozyTheme>
  )
}

export default SectionDialog
