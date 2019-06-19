import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// for cozy-ui components
process.env.USE_REACT = true

configure({ adapter: new Adapter() })

// installed by cozy-scripts
require('babel-polyfill')

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}
