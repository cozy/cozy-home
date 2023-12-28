import fetch from 'node-fetch'
import CozyClient from 'cozy-client'
import log from 'cozy-logger'
import { updateMyselfWithIdentity } from './attributesHelpers'

global.fetch = fetch

const client = new CozyClient({
  uri: process.env.COZY_URL.trim(),
  token: process.env.COZY_CREDENTIALS.trim()
})
const contactCollection = client.getStackClient().collection('io.cozy.contacts')

async function main() {
  const newIdentity = getIdentity()

  const currentMyselfContact = await getCurrentMyselfContact()
  if (currentMyselfContact) {
    log('info', `Updating the me contact with new attributes`)
    updateMyselfWithIdentity(newIdentity, currentMyselfContact)
    await client.save(currentMyselfContact)
  } else {
    log('info', `The "me" contact could not be found, creating it`)
    await client.save({
      _type: 'io.cozy.contacts',
      me: true,
      ...newIdentity.contact
    })
  }
}

async function getCurrentMyselfContact() {
  const meContacts = (await contactCollection.find({ me: true })).data
  return meContacts.length === 0 ? false : meContacts.pop()
}

function getIdentity() {
  try {
    return JSON.parse(process.env.COZY_COUCH_DOC)
  } catch (e) {
    throw new Error(`Wrong formatted identity doc: ${e.message}`)
  }
}

const handleError = e => {
  log('critical', e.message)
}

try {
  main().catch(handleError)
} catch (e) {
  handleError(e)
}
