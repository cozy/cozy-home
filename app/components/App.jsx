/** @jsx h */
import { h } from 'preact'

import Sidebar from './Sidebar'
import Notifier from './Notifier'

const App = ({ categories, children }) => (
  <div role='application'>
    <Sidebar categories={categories} />
    <main>
      <div role='contentinfo'>
        {children}
      </div>
    </main>
    <Notifier />
  </div>
)

export default App
