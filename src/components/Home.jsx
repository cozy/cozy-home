import React, { Component } from 'react'
import classNames from 'classnames'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import { translate } from 'cozy-ui/react/I18n'
import { Main, Content } from 'cozy-ui/react/Layout'

import AccountPicker from 'components/AccountPicker'
import Konnector from 'components/Konnector'
import Applications from 'components/Applications'
import ConnectionManagement from 'containers/ConnectionManagement'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import { isTutorial, display as displayTutorial } from 'lib/tutorial'

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
    const { wrapper, match } = this.props
    return (
      <Main>
        <ScrollToTopOnMount target={wrapper} />
        <Content>
          <div
            className={classNames('col-content', {
              'has-custom-background': false
            })}
          >
            <Applications />
            <Services />
          </div>
        </Content>
        <Route path="/connected/:konnectorSlug" component={Konnector} />
        {/* <Switch>
          <Route
            exact
            path="/connected/:konnectorSlug"
            component={AccountPicker}
          />
          <Route
            path="/connected/:konnectorSlug/new"
            render={props => (
              <ConnectionManagement originPath="/connected" {...props} />
            )}
          />
          <Route
            path="/connected/:konnectorSlug/accounts/:accountId"
            component={AccountPicker}
          />
        </Switch> */}
      </Main>
    )
  }
}

export default withRouter(translate()(Home))
