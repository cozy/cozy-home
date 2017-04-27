/** @jsx h */
import { h } from 'preact'
import { Link, withRouter } from 'react-router'
import { translate } from '../plugins/preact-polyglot'

import styles from '../styles/sidebar.styl'

const Sidebar = ({ t, categories, router }) => {
  let isCategoryView = router.location.pathname.match(/^\/category/) !== null
  const i18nCategories =
    categories.filter(c => c !== 'others')
      .map(c => ({ slug: c, label: t(`${c} category`) }))
      .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <aside className={styles['coz-sidebar']}>
      <ul role='navigation' className={styles['coz-nav']}>
        <li className={styles['coz-nav-item']}>
          <Link to='/discovery' className={styles['coz-nav-link']} activeClassName={styles['active']}>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-compass.svg')}
              />
            </svg>
            {t('my_accounts discovery title')}
          </Link>
        </li>
        <li className={styles['coz-nav-item']}>
          <Link to='/category/all'
            className={isCategoryView ? styles['active'] : ''}>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-grid.svg')}
              />
            </svg>
            {t('my_accounts category title')}
          </Link>
          {isCategoryView &&
            <ul className={styles['con-nav-submenu']}>
              <li>
                <Link to='/category/all' className={styles['con-nav-submenu-link']} activeClassName={styles['active']}>
                  {t('all category')}
                </Link>
              </li>
              {i18nCategories.map(category => (
                <li>
                  <Link to={`/category/${category.slug}`} className={styles['con-nav-submenu-link']} activeClassName={styles['active']}>
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to='/category/others' className={styles['con-nav-submenu-link']} activeClassName={styles['active']}>
                  {t('others category')}
                </Link>
              </li>
            </ul>
          }
        </li>
        <li className={styles['coz-nav-item']}>
          <Link to='/connected' className={styles['coz-nav-link']} activeClassName={styles['active']}>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-pin.svg')}
              />
            </svg>
            {t('my_accounts connected title')}
          </Link>
        </li>
      </ul>
    </aside>
  )
}
export default translate()(withRouter(Sidebar))
