import React from 'react'
import { Link, withRouter } from 'react-router'
import { translate } from 'cozy-ui/react/I18n'

export const Sidebar = ({ t, categories, router }) => {
  let isCategoryView = router.location.pathname.match(/^\/providers/) !== null
  const i18nCategories = categories
    .filter(c => c !== 'others')
    .map(c => ({ slug: c, label: t(`category.${c}`) }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <aside className="coz-sidebar">
      <nav>
        <ul className="coz-nav">
          <li className="coz-nav-item">
            <Link
              to="/connected"
              className="coz-nav-link col-cat-connected"
              activeClassName="active"
            >
              {t('nav.connected')}
            </Link>
          </li>
          <li className="coz-nav-item">
            <Link
              to="/providers/all"
              className={
                isCategoryView
                  ? 'coz-nav-link col-cat-categories active'
                  : 'coz-nav-link col-cat-categories'
              }
            >
              {t('nav.providers')}
            </Link>
          </li>
          {isCategoryView && (
            <ul className="col-nav-submenu">
              <li>
                <Link
                  to="/providers/all"
                  className="col-nav-submenu-link"
                  activeClassName="active"
                >
                  {t('category.all')}
                </Link>
              </li>
              {i18nCategories.map(category => (
                <li>
                  <Link
                    to={`/providers/${category.slug}`}
                    className="col-nav-submenu-link"
                    activeClassName="active"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/providers/others"
                  className="col-nav-submenu-link"
                  activeClassName="active"
                >
                  {t('category.other')}
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </aside>
  )
}
export default translate()(withRouter(Sidebar))
