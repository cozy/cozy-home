import {
  DisplayMode,
  Section,
  SectionSetting
} from 'components/Sections/SectionsTypes'
import {
  _defaultLayout,
  formatSections,
  computeDisplayMode,
  handleSectionAction
} from 'components/Sections/utils'

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
    ] as Section[]

    const layout = [
      {
        id: '1',
        originalName: 'Name 1',
        createdByApp: 'By 1',
        mobile: {
          detailedLines: false,
          grouped: false
        },
        desktop: {
          detailedLines: true,
          grouped: true
        },
        order: 2
      },
      {
        id: '2',
        originalName: 'Name 2',
        createdByApp: 'By 2',
        mobile: {
          detailedLines: true,
          grouped: true
        },
        desktop: {
          detailedLines: false,
          grouped: true
        },
        order: 1
      }
    ] as SectionSetting[]

    const expectedOutput = {
      groupedSections: [
        {
          id: '2',
          items: [{ id: 'item2' }],
          layout: {
            createdByApp: 'By 2',
            desktop: { detailedLines: false, grouped: true },
            mobile: { detailedLines: true, grouped: true },
            order: 1,
            originalName: 'Name 2'
          },
          name: 'Name 2'
        },
        {
          id: '1',
          items: [{ id: 'item1' }],
          layout: {
            createdByApp: 'By 1',
            desktop: { detailedLines: true, grouped: true },
            mobile: { detailedLines: false, grouped: false },
            order: 2,
            originalName: 'Name 1'
          },
          name: 'Name 1'
        }
      ],
      ungroupedSections: [
        {
          id: '3',
          items: [{ id: 'item3' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'Name 3'
        }
      ]
    }

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })

  it('should sort sections with the same order alphabetically by name', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] },
      { id: '3', name: 'C Folder', items: [{ id: 'item3' }] }
    ] as Array<Section>

    const layout = [
      { id: '1', order: 1 },
      { id: '2', order: 1 },
      { id: '3', order: 1 }
    ] as SectionSetting[]

    const expectedOutput = {
      groupedSections: [],
      ungroupedSections: [
        {
          id: '2',
          items: [{ id: 'item2' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: 1,
            originalName: ''
          },
          name: 'A Folder'
        },
        {
          id: '1',
          items: [{ id: 'item1' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: 1,
            originalName: ''
          },
          name: 'B Folder'
        },
        {
          id: '3',
          items: [{ id: 'item3' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: 1,
            originalName: ''
          },
          name: 'C Folder'
        }
      ]
    }

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })

  it('should place sections without order at the end, sorted alphabetically by name', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] },
      { id: '3', name: 'C Folder', items: [{ id: 'item3' }] }
    ] as Array<Section>

    const layout = [
      { id: '1', order: 2 },
      { id: '2' }, // No order
      { id: '3', order: 1 }
    ] as SectionSetting[]

    const expectedOutput = {
      groupedSections: [],
      ungroupedSections: [
        {
          id: '3',
          items: [{ id: 'item3' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: 1,
            originalName: ''
          },
          name: 'C Folder'
        },
        {
          id: '1',
          items: [{ id: 'item1' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: 2,
            originalName: ''
          },
          name: 'B Folder'
        },
        {
          id: '2',
          items: [{ id: 'item2' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'A Folder'
        }
      ]
    }

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle the case where no layout is provided', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] }
    ] as Array<Section>

    const expectedOutput = {
      groupedSections: [],
      ungroupedSections: [
        {
          id: '2',
          items: [{ id: 'item2' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'A Folder'
        },
        {
          id: '1',
          items: [{ id: 'item1' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'B Folder'
        }
      ]
    }

    const result = formatSections(folders)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle the case where an empty array is provided as layout', () => {
    const folders = [
      { id: '1', name: 'B Folder', items: [{ id: 'item1' }] },
      { id: '2', name: 'A Folder', items: [{ id: 'item2' }] }
    ] as Array<Section>

    const layout: SectionSetting[] = []

    const expectedOutput = {
      groupedSections: [],
      ungroupedSections: [
        {
          id: '2',
          items: [{ id: 'item2' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'A Folder'
        },
        {
          id: '1',
          items: [{ id: 'item1' }],
          layout: {
            createdByApp: '',
            desktop: { detailedLines: false, grouped: false },
            mobile: { detailedLines: false, grouped: false },
            order: Infinity,
            originalName: ''
          },
          name: 'B Folder'
        }
      ]
    }

    const result = formatSections(folders, layout)
    expect(result).toEqual(expectedOutput)
  })
})

describe('handleSectionAction', () => {
  it('should save the updated section layout', () => {
    const section = {
      id: '1',
      name: 'Section 1',
      items: [{ id: 'item1' }],
      layout: {
        ..._defaultLayout,
        mobile: { detailedLines: false, grouped: false },
        desktop: { detailedLines: true, grouped: true }
      }
    } as Section

    const isMobile = true
    const displayMode = DisplayMode.DETAILED
    const values = { shortcutsLayout: [] }
    const save = jest.fn()

    handleSectionAction(section, isMobile, displayMode, values, save)

    expect(save).toHaveBeenCalledWith({
      shortcutsLayout: [
        {
          ..._defaultLayout,
          mobile: { detailedLines: true, grouped: false },
          desktop: { detailedLines: true, grouped: true },
          id: '1'
        }
      ]
    })
  })
})

describe('computeDisplayMode', () => {
  it('should return DETAILED mode for mobile if detailedLines is true', () => {
    const section = {
      layout: {
        mobile: { detailedLines: true, grouped: false },
        desktop: { detailedLines: false, grouped: true }
      }
    } as Section

    const isMobile = true
    const result = computeDisplayMode(isMobile, section)
    expect(result).toBe(DisplayMode.DETAILED)
  })

  it('should return COMPACT mode for desktop if detailedLines is false', () => {
    const section = {
      layout: {
        mobile: { detailedLines: true, grouped: false },
        desktop: { detailedLines: false, grouped: true }
      }
    } as Section

    const isMobile = false
    const result = computeDisplayMode(isMobile, section)
    expect(result).toBe(DisplayMode.COMPACT)
  })
})
