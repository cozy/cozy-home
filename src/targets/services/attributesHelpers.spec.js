import { findNewAttributes, mergeAttributes } from './attributesHelpers'

describe('attributesHelpers', () => {
  const newIdentity = {
    contact: { name: 'John', age: 32 }
  }
  let currentMyselfContactMock

  beforeEach(() => {
    jest.clearAllMocks()
    currentMyselfContactMock = {
      id: 1
    }
  })

  const contactCollection = {}
  contactCollection.update = jest.fn()
  const mockLog = jest.spyOn(console, 'log')

  describe('when there are new attributes', () => {
    it('should be found', () => {
      const newAttributesFound = findNewAttributes(
        newIdentity.contact,
        currentMyselfContactMock
      )
      expect(Object.keys(newAttributesFound).length).toBe(2)
      expect(newAttributesFound).toEqual({ name: 'John', age: 32 })
    })
  })

  describe('when there are attributes', () => {
    it('if there are new ones, they should be added in currentMySelfContact', async () => {
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      await mergeAttributes(
        newIdentity,
        currentMyselfContactMock,
        contactCollection
      )
      expect(mockLog).toBeCalledTimes(3)
      expect(currentMyselfContactMock).toEqual({ id: 1, name: 'John', age: 32 })
    })

    it('if the key already exist so the value not should be updated in currentMySelfContact', async () => {
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      const newIdentityWithSameKey = {
        contact: { id: 2 }
      }
      await mergeAttributes(
        newIdentityWithSameKey,
        currentMyselfContactMock,
        contactCollection
      )
      expect(mockLog).toBeCalledTimes(2)
      expect(currentMyselfContactMock).toEqual({ id: 1 })
    })

    it('if the key exist so the value not should be updated, only the new attributes of currentMySelfContact', async () => {
      const newIdentityWithKeyExisting = {
        contact: { id: 2, name: 'John', age: 32 }
      }
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      await mergeAttributes(
        newIdentityWithKeyExisting,
        currentMyselfContactMock,
        contactCollection
      )
      expect(currentMyselfContactMock).toEqual({ id: 1, name: 'John', age: 32 })
    })
  })
})
