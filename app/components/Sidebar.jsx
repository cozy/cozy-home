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
    <aside className='coz-sidebar'>
      <nav>
        <ul className='coz-nav'>
          <li className='coz-nav-item'>
            <Link to='/discovery' className='coz-nav-link con-cat-discovery' activeClassName='active'>
              {t('discovery title')}
            </Link>
          </li>
          <li className='coz-nav-item'>
            <Link to='/category/all'
              className={isCategoryView ? 'coz-nav-link con-cat-categories active' : 'coz-nav-link con-cat-categories'}>
              {t('category title')}
            </Link>
          </li>
          {isCategoryView &&
            <ul className='con-nav-submenu'>
              <li>
                <Link to='/category/all' className='con-nav-submenu-link' activeClassName='active'>
                  {t('all category')}
                </Link>
              </li>
              {i18nCategories.map(category => (
                <li>
                  <Link to={`/category/${category.slug}`} className='con-nav-submenu-link' activeClassName='active'>
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to='/category/others' className='con-nav-submenu-link' activeClassName='active'>
                  {t('others category')}
                </Link>
              </li>
            </ul>
          }
          <li className='coz-nav-item'>
            <Link to='/connected' className='coz-nav-link con-cat-connected' activeClassName='active'>
              {t('connected title')}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
export default translate()(withRouter(Sidebar))
