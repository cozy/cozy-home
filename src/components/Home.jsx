import React, { Component } from 'react'
import { Route, withRouter } from 'react-router'

import { translate } from 'cozy-ui/react/I18n'
import { Main, Content } from 'cozy-ui/react/Layout'

import Konnector from 'components/Konnector'
import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import { isTutorial, display as displayTutorial } from 'lib/tutorial'
import FooterLogo from 'components/FooterLogo'

class Home extends Component {
  componentDidMount() {
    this.launchTutorial()
  }

  componentWillReceiveProps(props) {
    this.UNSAFE_componentWillReceiveProps(props)
  }

  UNSAFE_componentWillReceiveProps() {
    this.launchTutorial()
  }

  launchTutorial() {
    if (isTutorial()) {
      window.history.pushState({}, '', `/${window.location.hash}`)
      setTimeout(() => {
        displayTutorial(this.props.t)
      }, 1000)
    }
  }

  render() {
    const { wrapper } = this.props
    return (
      <Main className="main-content">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="lists-wrapper">
          <Applications />
          <Services />
          <FooterLogo />
        </Content>
        <Route path="/connected/:konnectorSlug" component={Konnector} />
      </Main>
    )
  }
}

export default withRouter(translate()(Home))
