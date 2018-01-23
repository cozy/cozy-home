import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import Nav, { NavLink, NavItem, NavIcon, NavText } from 'cozy-ui/react/Nav'
import UISidebar from 'cozy-ui/react/Sidebar'

import providersIcon from 'assets/icons/icon-stack.svg'
import connectedIcon from 'assets/icons/icon-pin.svg'

export const Sidebar = ({ t, categories, location }) => {
  let isCategoryView = location.pathname.match(/^\/providers/) !== null
  const i18nCategories = categories
    .filter(c => c !== 'others')
    .map(c => ({ slug: c, label: t(`category.${c}`) }))
    .sort((a, b) => a.label.localeCompare(b.label))

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
        <NavItem>
          <RouterLink
            to="/providers/all"
            activeClassName={NavLink.activeClassName}
            className={
              isCategoryView
                ? `${NavLink.className} ${NavLink.activeClassName}`
                : NavLink.className
            }
          >
            <NavIcon icon={providersIcon} />
            <NavText>{t('nav.providers')}</NavText>
          </RouterLink>
        </NavItem>
        {isCategoryView && (
          <ul className="col-nav-submenu">
            <li>
              <RouterLink
                to="/providers/all"
                className="col-nav-submenu-link"
                activeClassName="active"
              >
                {t('category.all')}
              </RouterLink>
            </li>
            {i18nCategories.map(category => (
              <li>
                <RouterLink
                  to={`/providers/${category.slug}`}
                  className="col-nav-submenu-link"
                  activeClassName="active"
                >
                  {category.label}
                </RouterLink>
              </li>
            ))}
            <li>
              <RouterLink
                to="/providers/others"
                className="col-nav-submenu-link"
                activeClassName="active"
              >
                {t('category.other')}
              </RouterLink>
            </li>
          </ul>
        )}
      </Nav>
    </UISidebar>
  )
}
export default translate()(withRouter(Sidebar))
