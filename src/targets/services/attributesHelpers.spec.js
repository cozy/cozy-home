import { updateMyselfWithIdentity } from './attributesHelpers'

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

  describe('when there are attributes', () => {
    it('if there are new ones, they should be added in currentMySelfContact', async () => {
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      await updateMyselfWithIdentity(newIdentity, currentMyselfContactMock)
      expect(currentMyselfContactMock).toEqual({ id: 1, name: 'John', age: 32 })
    })

    it('if the key already exist so the value not should be updated in currentMySelfContact', async () => {
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      const newIdentityWithSameKey = {
        contact: { id: 2 }
      }
      await updateMyselfWithIdentity(
        newIdentityWithSameKey,
        currentMyselfContactMock
      )
      expect(currentMyselfContactMock).toEqual({ id: 1 })
    })

    it('if the key exist so the value not should be updated, only the new attributes of currentMySelfContact', async () => {
      const newIdentityWithKeyExisting = {
        contact: { id: 2, name: 'John', age: 32 }
      }
      expect(currentMyselfContactMock).toEqual({ id: 1 })
      await updateMyselfWithIdentity(
        newIdentityWithKeyExisting,
        currentMyselfContactMock
      )
      expect(currentMyselfContactMock).toEqual({ id: 1, name: 'John', age: 32 })
    })
  })
})
