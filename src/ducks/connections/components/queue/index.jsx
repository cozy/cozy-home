import Queue from './queue'
import { connect } from 'react-redux'

import { getQueue, getRunConnections } from '../../../../reducers'

const mapStateToProps = (state, ownProps) => ({
  queue: getQueue(state),
  doneCount: getRunConnections(state)
  // successCount: getSuccessful(state).length
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  // purgeQueue: () => dispatch(purgeQueue())
})
export default connect(mapStateToProps, mapDispatchToProps)(Queue)
