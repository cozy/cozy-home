import React, { PureComponent } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Text, { SubTitle } from 'cozy-ui/react/Text'

export class Banner extends PureComponent {
  render() {
    const { actionButton, description, isImportant, title } = this.props
    return (
      <div
        className={cx(
          'u-bdrs-4 u-p-1-half u-bg-paleGrey',
          isImportant ? 'u-bg-chablis' : ''
        )}
      >
        <SubTitle className={isImportant ? 'u-pomegranate' : ''}>
          {title}
        </SubTitle>
        <Text className="u-mv-1">{description}</Text>
        {!!actionButton && actionButton}
      </div>
    )
  }
}

Banner.propTypes = {
  actionButton: PropTypes.element,
  description: PropTypes.string.isRequired,
  isImportant: PropTypes.bool,
  title: PropTypes.string.isRequired
}

export default Banner
