import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import Nav, { NavLink, NavItem, NavIcon, NavText } from 'cozy-ui/react/Nav'
import UISidebar from 'cozy-ui/react/Sidebar'

import connectedIcon from 'assets/icons/icon-pin.svg'

export const Sidebar = ({ t, categories, location }) => {
  return (
    <UISidebar>
      <Nav>
        <NavItem>
          <RouterLink
            to="/connected"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={connectedIcon} />
            <NavText>{t('nav.connected')}</NavText>
          </RouterLink>
        </NavItem>
      </Nav>
    </UISidebar>
  )
}
export default translate()(withRouter(Sidebar))
