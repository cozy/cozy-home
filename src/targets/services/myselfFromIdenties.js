import fetch from 'node-fetch'
import CozyClient from 'cozy-client'
import log from 'cozy-logger'
import omit from 'lodash/omit'

global.fetch = fetch

const client = new CozyClient({
  uri: process.env.COZY_URL.trim(),
  token: process.env.COZY_CREDENTIALS.trim()
}).getStackClient()
const contactCollection = client.collection('io.cozy.contacts')

async function main() {
  const newIdentity = getIdentity()

  const currentMyselfContact = await getCurrentMyselfContact()

  if (currentMyselfContact) {
    log('info', `Found a me contact`)
    const newAttributes = findNewAttributes(
      newIdentity.contact,
      currentMyselfContact
    )
    if (Object.keys(newAttributes).length) {
      log(
        'info',
        `And found the following new attributes : ${Object.keys(
          newAttributes
        ).join(', ')}`
      )
      Object.assign(currentMyselfContact, newAttributes)
      log('info', `Updating the me contact with new attributes`)
      await contactCollection.update(currentMyselfContact)
      // set new attributes to the current myself contact and update it in db
    } else {
      log('info', `No new attribute, nothing to do`)
    }
  } else {
    log('info', `The "me" contact could not be found, creating it`)
    await contactCollection.create({
      me: true,
      ...newIdentity.contact
    })
  }
}

function findNewAttributes(newContact, currentContact) {
  return omit(newContact, Object.keys(currentContact))
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
