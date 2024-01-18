import { formatShortcuts } from './utils'

const directories = [
  { _id: '1', attributes: { name: '1' } },
  { _id: '2', attributes: { name: '2' } }
]

const shortcuts = [
  { attributes: { dir_id: '1' } },
  { attributes: { dir_id: '2' } }
]

const expected = [
  { name: '1', shortcuts: [shortcuts[0]] },
  { name: '2', shortcuts: [shortcuts[1]] }
]

describe('formatShortcuts', () => {
  it('Merges directories and shortcuts arrays', () => {
    expect(formatShortcuts(directories, shortcuts)).toEqual(expected)
  })
  it('merges with null / empty array', () => {
    expect(formatShortcuts(null, [])).toBeUndefined()
    expect(formatShortcuts([], null)).toEqual([])
    expect(formatShortcuts(directories, null)).toBeUndefined()
  })
})
