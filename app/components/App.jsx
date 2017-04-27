/** @jsx h */
import { h } from 'preact'

import styles from '../styles/app.styl'
import classNames from 'classnames'

import Sidebar from './Sidebar'
import Notifier from './Notifier'

const App = ({ categories, children }) => (
  <div className={classNames(styles['con-wrapper'], styles['coz-sticky'])}>
    <Sidebar categories={categories} />
    <main className={styles['con-content']}>
      {children}
    </main>
    <Notifier />
  </div>
)

export default App
