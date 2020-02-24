import React from 'react'
import PropTypes from 'prop-types'
import Button, { ButtonLink } from 'cozy-ui/react/Button'
import { withBreakpoints } from 'cozy-ui/transpiled/react'

const CornerButton = ({ breakpoints: { isMobile }, ...otherProps }) => {
  const { href } = otherProps
  const ButtonComp = href ? ButtonLink : Button

  return (
    <ButtonComp
      size="small"
      theme="text"
      className="corner-button"
      iconOnly={isMobile}
      extension={isMobile ? 'narrow' : null}
      {...otherProps}
    />
  )
}

CornerButton.propTypes = {
  breakpoints: PropTypes.shape({
    isMobile: PropTypes.bool
  }).isRequired
}

export default withBreakpoints()(CornerButton)
