/** @jsx h */
import { h } from 'preact'
import { Link, withRouter } from 'react-router'
import { translate } from '../plugins/preact-polyglot'

const Sidebar = ({ t, categories, router }) => {
  let isCategoryView = router.location.pathname.match(/^\/category/) !== null
  const i18nCategories =
    categories.filter(c => c !== 'others')
      .map(c => ({ slug: c, label: t(`${c} category`) }))
      .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <aside>
      <h4>{t('my_accounts title')}</h4>
      <ul role='navigation'>
        <li>
          <Link to='/discovery' activeClassName='router-link-active'>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-discovery.svg')}
              />
            </svg>
            {t('my_accounts discovery title')}
          </Link>
        </li>
        <li>
          <Link to='/category/all'
            className={isCategoryView ? 'router-link-active' : ''}>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-category.svg')}
              />
            </svg>
            {t('my_accounts category title')}
          </Link>
          {isCategoryView &&
            <ul class='submenu'>
              <li>
                <Link to='/category/all' activeClassName='router-link-active'>
                  {t('all category')}
                </Link>
              </li>
              {i18nCategories.map(category => (
                <li>
                  <Link to={`/category/${category.slug}`} activeClassName='router-link-active'>
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to='/category/others' activeClassName='router-link-active'>
                  {t('others category')}
                </Link>
              </li>
            </ul>
          }
        </li>
        <li>
          <Link to='/connected' activeClassName='router-link-active'>
            <svg>
              <use
                xlinkHref={require('../assets/sprites/icon-connected.svg')}
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
