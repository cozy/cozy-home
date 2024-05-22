import { DirectoryData } from 'components/Shortcuts/types'
import { Section } from './SectionsTypes'
import { _defaultLayout, formatSections } from './utils'

describe('formatSections', () => {
  it('should merge sections and sort them correctly based on order and name', () => {
    const folders = [
      {
        id: '968dae76ae098d95ef402552fd001fcc',
        name: 'Applications Toutatice',
        items: [{ id: 'item1' }]
      },
      {
        id: '968dae76ae098d95ef402552fd0009c0',
        name: 'Infos',
        items: [{ id: 'item2' }]
      },
      {
        id: '968dae76ae098d95ef402552fd001234',
        name: 'Another Folder',
        items: [{ id: 'item3' }]
      }
    ] as Array<DirectoryData>

    const layout = [
      {
        id: '968dae76ae098d95ef402552fd001fcc',
        layout: {
          originalName: 'Applications Toutatice',
          createdByApp: 'toutatice',
          mobile: {
            detailedLine: false,
            grouped: false
          },
          desktop: {
            detailedLine: true,
            grouped: true
          },
          order: 3
        }
      },
      {
        id: '968dae76ae098d95ef402552fd0009c0',
        layout: {
          originalName: 'Infos',
          createdByApp: 'infos',
          mobile: {
            detailedLine: true,
            grouped: true
          },
          desktop: {
            detailedLine: false,
            grouped: true
          },
          order: 4
        }
      }
    ] as Section[]

    const expectedOutput = [
      {
        id: '968dae76ae098d95ef402552fd001fcc',
        name: 'Applications Toutatice',
        items: [{ id: 'item1' }],
        layout: {
          ..._defaultLayout,
          order: 3,
          originalName: 'Applications Toutatice',
          createdByApp: 'toutatice',
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
        id: '968dae76ae098d95ef402552fd0009c0',
        name: 'Infos',
        items: [{ id: 'item2' }],
        layout: {
          ..._defaultLayout,
          order: 4,
          originalName: 'Infos',
          createdByApp: 'infos',
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
        id: '968dae76ae098d95ef402552fd001234',
        name: 'Another Folder',
        items: [{ id: 'item3' }],
        layout: {
          ..._defaultLayout,
          order: Infinity
        }
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
      { id: '1', layout: { order: 1 } },
      { id: '2', layout: { order: 1 } },
      { id: '3', layout: { order: 1 } }
    ] as Section[]

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
      { id: '1', layout: { order: 2 } },
      { id: '2', layout: {} }, // No order
      { id: '3', layout: { order: 1 } }
    ] as Section[]

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
