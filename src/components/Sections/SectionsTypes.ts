import React from 'react'

import { IOCozyKonnector, IOCozyFile } from 'cozy-client/types/types'

export interface DeviceSettings {
  detailedLines: boolean
  grouped: boolean
}

export interface Section {
  id: string
  name: string
  items: IOCozyFile[] | IOCozyKonnector[]
  layout: {
    originalName: string
    createdByApp: string
    mobile: DeviceSettings
    desktop: DeviceSettings
    order: number
  }
  type?: string
  pristine?: boolean
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

export interface GroupedSectionTileProps {
  section: Section
}

export interface SectionsViewProps {
  data?: IOCozyFile[] | IOCozyKonnector[]
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

export interface KonnectorFromRegistry {
  created_at: string
  data_usage_commitment: string
  data_usage_commitment_by: string
  editor: string
  label: number
  latest_version: LatestVersion
  slug: string
  type: string
  versions: Versions
}

interface LatestVersion {
  attachments: Attachments
  slug: string
  editor: string
  type: string
  version: string
  manifest: IOCozyKonnector
  created_at: string
  url: string
  size: string
  sha256: string
  tar_prefix: string
}

interface Attachments {
  'afer.tar.gz': string
  icon: string
  partnership_icon: string
}

interface Versions {
  has_versions: boolean
  stable: string[]
}

export interface SectionsContextValue {
  konnectorsByCategory: Section[]
  shortcutsDirectories: Section[]
  ungroupedSections: Section[]
  groupedSections: Section[]
  displayTutorialTip: boolean
  isRunning: (slug: string) => boolean
  isSuggested: (slug: string) => boolean
  isInMaintenance: (slug: string) => boolean
}
