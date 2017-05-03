/** @jsx h */
import { h } from 'preact'
import { Link, withRouter } from 'react-router'
import { translate } from '../plugins/preact-polyglot'

const ConnectorItem = ({ title, subtitle, connected, slug, iconName, enableDefaultIcon = false, router }) => (
  <Link class='item-wrapper' to={`${router.location.pathname}/${slug}`}>
    <header class='item-header'>
      {iconName &&
        <svg class='item-icon'>
          <use xlinkHref={icon(iconName, enableDefaultIcon)} />
        </svg>
      }
    </header>
    <p class='item-title'>{title}</p>
    {subtitle && <p class='item-subtitle'>{subtitle}</p>}
    {connected &&
      <svg class='item-connected'>
        <use xlinkHref={require('../assets/sprites/icon-check.svg')} />
      </svg>
    }
  </Link>
)

// Fallback to get the item icon and avoid error if not found
// with a possible default icon
const icon = (iconName, enableDefaultIcon) => {
  let icon = ''
  try {
    icon = require(`../assets/icons/color/${iconName}.svg`)
  } catch (e) {
    if (enableDefaultIcon) {
      icon = require('../assets/icons/color/default_myaccount.svg')
    }
  }
  return icon
}

export default translate()(withRouter(ConnectorItem))
