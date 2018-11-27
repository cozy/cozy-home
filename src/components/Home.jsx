import React, { Component } from 'react'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import classNames from 'classnames'
import { Main, Content } from 'cozy-ui/react/Layout'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import Applications from './Applications'
import ConnectionManagement from '../containers/ConnectionManagement'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import AccountPicker from './AccountPicker'
import Services from './Services'
import { translate } from 'cozy-ui/react/I18n'

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
        <Switch>
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
            render={props => (
              <ConnectionManagement originPath="/connected" {...props} />
            )}
          />
          <Redirect from="/connected/*" to="/connected" />
        </Switch>
      </Main>
    )
  }
}

export default withRouter(translate()(Home))
