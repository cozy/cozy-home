interface CozyMetadata {
  doctypeVersion: string
  metadataVersion: number
  createdAt: string
  createdByApp: string
  updatedAt: string
  updatedByApps: {
    slug: string
    date: string
    instance: string
  }[]
  createdOn: string
  uploadedAt?: string
  uploadedBy?: {
    slug: string
  }
  uploadedOn?: string
}

interface DirectoryAttributes {
  type: string
  name: string
  dir_id: string
  created_at: string
  updated_at: string
  path: string
  cozyMetadata: CozyMetadata
}

interface FileAttributes extends DirectoryAttributes {
  size: string
  md5sum: string
  mime: string
  class: string
  executable: boolean
  trashed: boolean
  encrypted: boolean
  metadata: {
    extractor_version: number
  }
}

interface Meta {
  rev: string
}

interface Links {
  self: string
}

interface Relationships {
  referenced_by: {
    links: {
      self: string
    }
    data: null
  }
  parent?: {
    links: {
      related: string
    }
    data: {
      id: string
      type: string
    }
  }
}

export interface DirectoryData {
  items: FileData[]
  id: string
  _id: string
  _type: string
  type: string
  attributes: DirectoryAttributes
  meta: Meta
  links: Links
  relationships: Relationships
  name: string
  dir_id: string
  created_at: string
  updated_at: string
  path: string
  cozyMetadata: CozyMetadata
  _rev: string
}

export interface FileData {
  id: string
  _id: string
  _type: string
  type: string
  attributes: FileAttributes
  meta: Meta
  links: Links
  relationships: Relationships
  name: string
  dir_id: string
  created_at: string
  updated_at: string
  size: string
  md5sum: string
  mime: string
  class: string
  executable: boolean
  trashed: boolean
  encrypted: boolean
  metadata: {
    description?: string
    extractor_version: number
  }
  cozyMetadata: CozyMetadata
  path: string
  _rev: string
}

export type DirectoryDataArray = DirectoryData[]
export type FileDataArray = FileData[]
