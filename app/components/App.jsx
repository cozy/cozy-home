/** @jsx h */
import { h } from 'preact'

import Sidebar from './Sidebar'
import Notifier from './Notifier'

const App = ({ categories, children }) => (
  <div className='con-wrapper coz-sticky'>
    <Sidebar categories={categories} />
    <main className='con-content'>
      <div role='contentinfo'>
        {children}
      </div>
    </main>
    <Notifier />
  </div>
)

export default App
