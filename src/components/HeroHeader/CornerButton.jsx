import React from 'react'
import cx from 'classnames'
import Button, { ButtonLink } from 'cozy-ui/transpiled/react/deprecated/Button'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles(theme => ({
  cornerButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary
    },
    '&:visited': {
      color: theme.palette.text.secondary
    }
  },
  cornerButtonInverted: {
    color: theme.palette.text.primary
  }
}))

const CornerButton = props => {
  const { isMobile } = useBreakpoints()
  const classes = useStyles()
  const theme = useCozyTheme()
  const { href } = props
  const ButtonComp = href ? ButtonLink : Button

  return (
    <ButtonComp
      size={isMobile ? 'normal' : 'small'}
      theme="text"
      className={cx('corner-button', {
        [classes.cornerButton]: theme.variant === 'normal',
        [classes.cornerButtonInverted]: theme.variant === 'inverted'
      })}
      iconOnly={isMobile}
      extension={isMobile ? 'narrow' : null}
      {...props}
    />
  )
}

export default CornerButton
