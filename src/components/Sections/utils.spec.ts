import { DirectoryData, DirectoryDataArray } from 'components/Shortcuts/types'
import { SectionSetting } from './SectionsTypes'
import { _defaultLayout, formatSections } from './utils'

describe('formatSections', () => {
  it('should merge sections and sort them correctly based on order and name', () => {
    const folders = [
      {
        id: '1',
        name: 'Name 1',
        items: [{ id: 'item1' }]
      },
      {
        id: '2',
        name: 'Name 2',
        items: [{ id: 'item2' }]
      },
      {
        id: '3',
        name: 'Name 3',
        items: [{ id: 'item3' }]
      }
    ] as DirectoryDataArray

    const layout = [
      {
        id: '1',
        originalName: 'Name 1',
        createdByApp: 'By 1',
        mobile: {
          detailedLine: false,
          grouped: false
        },
        desktop: {
          detailedLine: true,
          grouped: true
        },
        order: 2
      },
      {
        id: '2',
        originalName: 'Name 2',
        createdByApp: 'By 2',
        mobile: {
          detailedLine: true,
          grouped: true
        },
        desktop: {
          detailedLine: false,
          grouped: true
        },
        order: 1
      }
    ] as SectionSetting[]

    const expectedOutput = [
      {
        id: '2',
        name: 'Name 2',
        items: [{ id: 'item2' }],
        layout: {
          ..._defaultLayout,
          order: 1,
          originalName: 'Name 2',
          createdByApp: 'By 2',
          mobile: {
            detailedLine: true,
            grouped: true
          },
          desktop: {
            detailedLine: false,
            grouped: true
          }
        }
      },
      {
        id: '1',
        name: 'Name 1',
        items: [{ id: 'item1' }],
        layout: {
          ..._defaultLayout,
          order: 2,
          originalName: 'Name 1',
          createdByApp: 'By 1',
          mobile: {
            detailedLine: false,
            grouped: false
          },
          desktop: {
            detailedLine: true,
            grouped: true
          }
        }
      },
      {
        id: '3',
        name: 'Name 3',
        items: [{ id: 'item3' }],
        layout: _defaultLayout
      }
    ]

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })

  it('should sort sections with the same order alphabetically by name', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] },
      { id: '3', name: 'C Folder', items: [{ id: 'item3' }] }
    ] as Array<DirectoryData>

    const layout = [
      { id: '1', order: 1 },
      { id: '2', order: 1 },
      { id: '3', order: 1 }
    ] as SectionSetting[]

    const expectedOutput = [
      {
        id: '2',
        name: 'A Folder',
        items: [{ id: 'item2' }],
        layout: { ..._defaultLayout, order: 1 }
      },
      {
        id: '1',
        name: 'B Folder',
        items: [{ id: 'item1' }],
        layout: { ..._defaultLayout, order: 1 }
      },
      {
        id: '3',
        name: 'C Folder',
        items: [{ id: 'item3' }],
        layout: { ..._defaultLayout, order: 1 }
      }
    ]

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })

  it('should place sections without order at the end, sorted alphabetically by name', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] },
      { id: '3', name: 'C Folder', items: [{ id: 'item3' }] }
    ] as Array<DirectoryData>

    const layout = [
      { id: '1', order: 2 },
      { id: '2' }, // No order
      { id: '3', order: 1 }
    ] as SectionSetting[]

    const expectedOutput = [
      {
        id: '3',
        name: 'C Folder',
        items: [{ id: 'item3' }],
        layout: { ..._defaultLayout, order: 1 }
      },
      {
        id: '1',
        name: 'B Folder',
        items: [{ id: 'item1' }],
        layout: { ..._defaultLayout, order: 2 }
      },
      {
        id: '2',
        name: 'A Folder',
        items: [{ id: 'item2' }],
        layout: { ..._defaultLayout, order: Infinity }
      }
    ]

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })
})
