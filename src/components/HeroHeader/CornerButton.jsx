import React from 'react'
import cx from 'classnames'
import Button, { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { useCozyTheme } from 'cozy-ui/transpiled/react/CozyTheme'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles(theme => ({
  cornerButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary
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
        [classes.cornerButton]: theme === 'normal',
        [classes.cornerButtonInverted]: theme === 'inverted'
      })}
      iconOnly={isMobile}
      extension={isMobile ? 'narrow' : null}
      {...props}
    />
  )
}

export default CornerButton
