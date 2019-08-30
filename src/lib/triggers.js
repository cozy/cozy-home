export async function fetch(cozy, triggerId) {
  return cozy.fetchJSON('GET', `/jobs/triggers/${triggerId}`)
}
