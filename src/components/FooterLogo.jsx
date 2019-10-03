import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { withClient } from 'cozy-client'

const fetchHomeLogos = async client => {
  try {
    const rootURL = client.getStackClient().uri
    const context = await client
      .getStackClient()
      .fetchJSON('GET', '/settings/context')
    const logos = get(context, 'data.attributes.home_logos', {})

    return Object.keys(logos).reduce((acc, logoSrc) => {
      acc[`${rootURL}/assets${logoSrc}`] = logos[logoSrc]
      return acc
    }, {})
  } catch (error) {
    return {}
  }
}

export class FooterLogo extends React.Component {
  state = {
    logos: {}
  }

  async componentDidMount() {
    const logos = await fetchHomeLogos(this.props.client)
    this.setState({ logos })
  }

  render() {
    const { logos } = this.state
    return Object.keys(logos).length === 0 ? (
      false
    ) : (
      <div className="u-maw-7 u-m-auto u-pv-1 u-mt-1 u-ta-center">
        {Object.entries(logos).map(([logoSrc, logoAlt]) => (
          <img
            key={logoSrc}
            src={logoSrc}
            alt={logoAlt}
            className="u-ph-1 u-pv-half"
          />
        ))}
      </div>
    )
  }
}

PropTypes.propTypes = {
  client: PropTypes.object
}

export default withClient(FooterLogo)
