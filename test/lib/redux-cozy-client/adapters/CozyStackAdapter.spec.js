/* eslint-env jest */
import CozyStackAdapter from 'lib/redux-cozy-client/adapters/CozyStackAdapter'

describe('CozyStack Adapter', () => {
  describe('fetchKonnectors', () => {
    it('should ignore manifest id', async () => {
      const stackClient = {
        fetchJSON: async () => {
          return {
            data: [
              {
                slug: 'test',
                id: 'io.cozy.konnectors/test',
                attributes: {
                  id: 'manifest id'
                }
              }
            ]
          }
        }
      }
      const adapter = new CozyStackAdapter(stackClient)
      const konnectors = await adapter.fetchKonnectors()
      expect(konnectors).toEqual({
        data: [
          {
            _type: 'io.cozy.konnectors',
            attributes: {
              id: 'manifest id'
            },
            id: 'io.cozy.konnectors/test',
            slug: 'test'
          }
        ],
        meta: undefined,
        next: false,
        skip: 0
      })
    })
  })
})
