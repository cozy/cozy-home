import Queue from './queue'
import { connect } from 'react-redux'

import { getQueue } from '../../../../reducers'

const mapStateToProps = (state, ownProps) => ({
  queue: getQueue(state)
  // doneCount: getProcessed(state).length,
  // successCount: getSuccessful(state).length
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  // purgeQueue: () => dispatch(purgeQueue())
})
export default connect(mapStateToProps, mapDispatchToProps)(Queue)
