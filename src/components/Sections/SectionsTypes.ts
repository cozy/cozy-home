import { DirectoryDataArray, FileData } from 'components/Shortcuts/types'

export interface DeviceSettings {
  detailedLines: boolean
  grouped: boolean
}

export interface Section {
  id: string
  name: string
  items: FileData[]
  layout: {
    originalName: string
    createdByApp: string
    mobile: DeviceSettings
    desktop: DeviceSettings
    order: number
  }
}

export interface SectionSetting {
  id: string
  originalName: string
  createdByApp: string
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
  data?: DirectoryDataArray
  type: 'shortcuts' | 'konnectorCategories'
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
  name: string
  anchorRef?: React.RefObject<HTMLButtonElement>
  toggleMenu: () => void
  menuState: boolean
  handleAction: (action: DisplayMode) => void
}
