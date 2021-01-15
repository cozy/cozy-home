import log from 'cozy-logger'
import omit from 'lodash/omit'

export const updateMyselfWithIdentity = (newIdentity, currentMyselfContact) => {
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
  } else {
    log('info', `No new attribute, nothing to do`)
  }
}

export function findNewAttributes(newContact, currentContact) {
  return omit(newContact, Object.keys(currentContact))
}
