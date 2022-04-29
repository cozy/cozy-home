import React, { Component } from 'react'
import { Route } from 'react-router'

import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Konnector from 'components/Konnector'
import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import FooterLogo from 'components/FooterLogo'
import Shortcuts from 'components/Shortcuts'

class Home extends Component {
  render() {
    const { wrapper } = this.props
    console.log('home')
    return (
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="u-flex u-flex-column u-ph-1">
          <Applications />
          <Services />
          <Shortcuts />
          <FooterLogo />
        </Content>
        <Route path="/connected/:konnectorSlug" component={Konnector} />
      </Main>
    )
  }
}

export default Home
