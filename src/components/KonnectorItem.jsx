import React, { Component } from 'react'
import { Link, withRouter } from 'react-router'
import { translate } from 'cozy-ui/react/I18n'

class KonnectorItem extends Component {
  render ({ konnector, router }) {
    const { category, name, slug } = konnector
    const errored = konnector.accounts.error
    const connected = !!konnector.accounts.length
    return (
      <Link className='item-wrapper' to={`${router.location.pathname}/${slug}`}>
        <header className='item-header'>
          <img className='item-icon' src={icon(slug)} />
        </header>
        <p className='item-title'>{name}</p>
        {category && <p className='item-subtitle'>{category}</p>}
        {stateIcon(errored, connected)}
      </Link>
    )
  }
}

const stateIcon = (errored, connected) => {
  if (!errored && !connected) return ''
  return <svg className='item-status-icon'>
    {errored && <use xlinkHref={require('../assets/sprites/icon-warning.svg')} /> }
    {(!errored && connected) && <use xlinkHref={require('../assets/sprites/icon-check.svg')} /> }
  </svg>
}

// Fallback to get the item icon and avoid error if not found
// with a possible default icon
const icon = (slug) => {
  let icon = ''
  try {
    icon = require(`../assets/icons/konnectors/${slug}.svg`)
  } catch (e) {
    icon = require('../assets/icons/konnectors/default.svg')
  }
  return icon
}

export default translate()(withRouter(KonnectorItem))
