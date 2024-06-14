import { DirectoryDataArray, FileData } from 'components/Shortcuts/types'
import React from 'react'

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

export interface GroupedSectionViewProps {
  sections: Section[]
}

export interface SectionsViewProps {
  data?: DirectoryDataArray
  type: 'shortcuts' | 'konnectorCategories'
}

export interface SectionDialogProps {
  onClose: () => void
  sections: Section[]
  hasDialog: string
}

export enum DisplayMode {
  COMPACT = 'compact',
  DETAILED = 'detailed'
}

export enum GroupMode {
  DEFAULT = 'default',
  GROUPED = 'grouped'
}

export type HandleActionCallback = (action: DisplayMode | GroupMode) => void

export type Action = {
  name: string
  action: (doc: Section[], opts: { handleAction: HandleActionCallback }) => void
  Component: React.FC
}

export interface SectionHeaderProps {
  section?: Section
  anchorRef?: React.RefObject<HTMLButtonElement>
  toggleMenu?: () => void
  menuState: boolean
}
