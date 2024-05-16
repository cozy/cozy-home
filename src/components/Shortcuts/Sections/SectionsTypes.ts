export interface DeviceSettings {
  detailed_lines: boolean
  grouped: boolean
}

export interface Section {
  id: string
  originalName: string
  createdByApp: string[]
  mobile: DeviceSettings
  desktop: DeviceSettings
  order: number
}

export interface SectionsLayout {
  sections: Section[]
}

export interface SectionViewProps {
  section: Section
}

export interface SectionsViewProps {
  sections: Section[]
}

export interface SectionItem {
  id: string
  name: string
  description: string
}

export enum DisplayMode {
  COMPACT = 'compact',
  DETAILED = 'detailed'
}

type HandleActionCallback = (action: DisplayMode) => void

export type Action = {
  name: string
  action: (doc: Section, opts: { handleAction: HandleActionCallback }) => void
  Component: React.FC
}

export interface SectionHeaderProps {
  sectionName: string
  showMore: boolean
  anchorRef?: React.RefObject<HTMLButtonElement>
  toggleMenu: () => void
  menuState: boolean
  handleAction: (action: DisplayMode) => void
}
