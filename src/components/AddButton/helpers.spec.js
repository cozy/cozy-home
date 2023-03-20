import { hasActionFlagCorrectValue, filterAvailableActions } from './helpers'
import flag from 'cozy-flags'

jest.mock('cozy-flags')

describe('hasActionFlagCorrectValue', () => {
  it('should check equality by default', () => {
    flag.mockImplementation(() => true)

    expect(
      hasActionFlagCorrectValue({
        name: 'test',
        value: 'true'
      })
    ).toBe(true)
  })

  it('should check difference if operator is $ne', () => {
    flag.mockImplementation(() => 'value1')

    expect(
      hasActionFlagCorrectValue({
        name: 'test',
        value: 'value2',
        operator: '$ne'
      })
    ).toBe(true)
  })

  it('should return true if flag and correct value is null', () => {
    flag.mockImplementation(() => null)

    expect(
      hasActionFlagCorrectValue({
        name: 'test',
        value: 'null'
      })
    ).toBe(true)
  })
})

describe('filterAvailableActions', () => {
  it('should manage flag array or single object', () => {
    flag.mockImplementation(() => true)

    const actions = [
      {
        slug: 'slug1',
        flag: [
          {
            name: 'flag1',
            value: 'true'
          },
          {
            name: 'flag2',
            value: 'true'
          }
        ]
      },
      {
        slug: 'slug2',
        flag: {
          name: 'flag1',
          value: 'false'
        }
      }
    ]

    expect(filterAvailableActions(actions)).toStrictEqual([
      {
        slug: 'slug1',
        flag: [
          {
            name: 'flag1',
            value: 'true'
          },
          {
            name: 'flag2',
            value: 'true'
          }
        ]
      }
    ])
  })
})
