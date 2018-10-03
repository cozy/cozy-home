/* triggers lib ready to be added to cozy-client-js */
import * as realtime from './realtime'

const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

export function subscribeAll(cozy) {
  return realtime.subscribeAll(cozy, TRIGGERS_DOCTYPE)
}
