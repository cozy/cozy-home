/* triggers lib ready to be added to cozy-client-js */
import * as realtime from './realtime'

const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

export async function fetch(cozy, triggerId) {
  return cozy.fetchJSON('GET', `/jobs/triggers/${triggerId}`)
}

export function subscribeAll(cozy) {
  return realtime.subscribeAll(cozy, TRIGGERS_DOCTYPE)
}
