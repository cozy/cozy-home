import React from 'react'
import { Link, withRouter } from 'react-router'
import { translate } from '../plugins/i18n'

const ConnectorItem = ({ title, subtitle, connected, errored, slug, iconName, backgroundCSS, enableDefaultIcon = false, isUseCase, router }) => (
  <Link className='item-wrapper' to={`${router.location.pathname}/${slug}`}>
    <header className='item-header' style={{background: backgroundCSS}}>
      {iconName &&
        <img className='item-icon' src={icon(iconName, enableDefaultIcon)} />
      }
    </header>
    <p className={isUseCase ? 'use-case-title' : 'item-title'}>{title}</p>
    {subtitle && <p className='item-subtitle'>{subtitle}</p>}
    {stateIcon(errored, connected)}
  </Link>
)

const stateIcon = (errored, connected) => {
  if (!errored && !connected) return ''
  return <svg className='item-status-icon'>
    {errored && <use xlinkHref={require('../assets/sprites/icon-warning.svg')} /> }
    {(!errored && connected) && <use xlinkHref={require('../assets/sprites/icon-check.svg')} /> }
  </svg>
}

// Fallback to get the item icon and avoid error if not found
// with a possible default icon
const icon = (iconName, enableDefaultIcon) => {
  let icon = ''
  try {
    icon = require(`../assets/icons/konnectors/${iconName}.svg`)
  } catch (e) {
    if (enableDefaultIcon) {
      icon = require('../assets/icons/konnectors/default.svg')
    }
  }
  return icon
}

export default translate()(withRouter(ConnectorItem))
