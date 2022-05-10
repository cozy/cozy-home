import { HashRouter } from 'react-router-dom'
import {
  shouldEnableTracking,
  getTracker
} from 'cozy-ui/transpiled/react/helpers/tracker'

const addPiwik = function (history) {
  let trackHistory = history
  if (shouldEnableTracking() && getTracker()) {
    let trackerInstance = getTracker()
    trackHistory = trackerInstance.connectToHistory(history)
    // when using a hash history, the initial visit is not tracked by piwik react router
    trackerInstance.track(trackHistory.location)
  }
  return trackHistory
}

export default class PiwikHashRouter extends HashRouter {
  constructor(props) {
    super(props)
    this.history = addPiwik(this.history)
  }
}
