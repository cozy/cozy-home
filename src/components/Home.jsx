import React, { Component } from 'react'
import classNames from 'classnames'
import { Route, withRouter, Redirect } from 'react-router'

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
      <Main>
        <ScrollToTopOnMount target={wrapper} />
        <Content className="u-flex">
          <div
            className={classNames('col-content', 'u-flex-grow-1', {
              'has-custom-background': false
            })}
          >
            <Applications />
            <Services />
          </div>
          <FooterLogo />
        </Content>
        <Route path="/connected/:konnectorSlug" component={Konnector} />
        <Redirect from="/connected/*" to="/connected" />
      </Main>
    )
  }
}

export default withRouter(translate()(Home))
