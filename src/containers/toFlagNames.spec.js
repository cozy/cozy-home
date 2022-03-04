import { toFlagNames } from './toFlagNames'

describe('toFlagNames', () => {
  it('should convert a data structure to flag names', () => {
    const initialData = [
      'simple-string-1',
      'simple-string-2',
      ['array-1', 'array-2'],
      [['sub-array-1', 'sub-array-2']],
      ['mixed-array-1', ['mixed-sub-array-1', 'mixed-sub-array-2']],
      {
        'object-1': ['nested-array-1', 'nested-array-2'],
        'object-2': {
          'sub-object-1': ['deep-array-1', 'deep-array-2']
        }
      }
    ]

    expect(toFlagNames(initialData)).toEqual([
      'simple-string-1',
      'simple-string-2',
      'array-1',
      'array-2',
      'sub-array-1',
      'sub-array-2',
      'mixed-array-1',
      'mixed-sub-array-1',
      'mixed-sub-array-2',
      'object-1.nested-array-1',
      'object-1.nested-array-2',
      'object-2.sub-object-1.deep-array-1',
      'object-2.sub-object-1.deep-array-2'
    ])
  })
})
