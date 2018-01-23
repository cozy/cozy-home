import { HashRouter } from 'react-router-dom'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

const addPiwik = function(history) {
  if (shouldEnableTracking() && getTracker()) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(history)
    // when using a hash history, the initial visit is not tracked by piwik react router
    trackerInstance.track(history.location)
  }
  return history
}

export default class PiwikHashRouter extends HashRouter {
  constructor(props) {
    super(props)
    this.history = addPiwik(this.history)
  }
}
