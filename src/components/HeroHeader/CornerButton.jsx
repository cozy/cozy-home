import React from 'react'
import Button, { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const CornerButton = props => {
  const { isMobile } = useBreakpoints()
  const { href } = props
  const ButtonComp = href ? ButtonLink : Button

  return (
    <ButtonComp
      size={isMobile ? 'normal' : 'small'}
      theme="text"
      className="corner-button"
      iconOnly={isMobile}
      extension={isMobile ? 'narrow' : null}
      {...props}
    />
  )
}

export default CornerButton
