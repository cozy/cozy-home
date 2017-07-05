import React from 'react'
import { Link, withRouter } from 'react-router'
import { translate } from 'cozy-ui/react/I18n'

// Fallback to get the item background image and avoid error if not found
const getItemBackground = (figure, context) => {
  let background = 'rgb(0, 130, 230)'
  if (figure && context) {
    try {
      let img = require(`../contexts/${context}/assets/img/${figure}`)
      background = `center/100% url(${img})`
    } catch (error) {
      console.warn && console.warn(`${figure} not found: ${error.message}`)
    }
  }
  return background
}

const UseCaseItem = ({ t, context, useCase, router }) => (
  <Link className='item-wrapper' to={`${router.location.pathname}/${useCase.slug}`}>
    <header className='item-header' style={{background: getItemBackground(useCase.figure, context)}} />
    <p className='use-case-title'>{t(`useCase.${useCase.slug}.title`)}</p>
  </Link>)

export default translate()(withRouter(UseCaseItem))
