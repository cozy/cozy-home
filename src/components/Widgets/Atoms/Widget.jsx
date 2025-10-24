import React, { memo, cloneElement } from 'react'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import styles from './widget.styl'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Button from 'cozy-ui/transpiled/react/Buttons'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const Widget = ({
  children,
}) => {
  const { type } = useCozyTheme()

  try {
    return (
      <div className={`${styles[`app-widget`]} ${styles[`app-widget-background--${type}`]} u-flex u-flex-column u-mh-auto u-bdrs-8`}>
        <div className={`${styles[`app-widget-children`]}`}>
          {children}
        </div>
      </div>
    )
  } catch (e) {
    console.error('Error rendering Widget component', e)
    return null
  }
}

export default Widget
