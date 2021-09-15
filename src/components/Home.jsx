import React, { Component } from 'react'
import { Route, withRouter } from 'react-router'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Konnector from 'components/Konnector'
import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import KonnectorErrors from 'components/KonnectorErrors'
import FooterLogo from 'components/FooterLogo'
import Shortcuts from 'components/Shortcuts'

class Home extends Component {
  render() {
    const { wrapper } = this.props
    return (
      <Main className="main-content">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="lists-wrapper">
          <Applications />
          <KonnectorErrors />
          <Services />
          <Shortcuts />
          <FooterLogo />
        </Content>
        <Route path="/connected/:konnectorSlug" component={Konnector} />
      </Main>
    )
  }
}

export default withRouter(translate()(Home))
