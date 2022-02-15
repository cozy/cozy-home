import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import log from 'cozy-logger'

// for cozy-ui components
process.env.USE_REACT = true

configure({ adapter: new Adapter() })

// installed by cozy-scripts
require('@babel/polyfill')

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

log.setLevel('error')

// eslint-disable-next-line no-console
const originalWarn = console.warn
// eslint-disable-next-line no-console
console.warn = function (msg, msg2) {
  if (
    msg &&
    msg.includes &&
    msg.includes('Please update the following components:') &&
    msg2 &&
    msg2 === 'ReactSwipableView'
  ) {
    return
  }
  return originalWarn.apply(this, arguments)
}
