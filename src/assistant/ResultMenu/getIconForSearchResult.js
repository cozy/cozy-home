import get from 'lodash/get'

import IconAudio from 'cozy-ui/transpiled/react/Icons/FileTypeAudio'
import IconBin from 'cozy-ui/transpiled/react/Icons/FileTypeBin'
import IconCode from 'cozy-ui/transpiled/react/Icons/FileTypeCode'
import IconFiles from 'cozy-ui/transpiled/react/Icons/FileTypeFiles'
import IconFolder from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import IconImage from 'cozy-ui/transpiled/react/Icons/FileTypeImage'
import IconNote from 'cozy-ui/transpiled/react/Icons/FileTypeNote'
import IconPdf from 'cozy-ui/transpiled/react/Icons/FileTypePdf'
import IconSheet from 'cozy-ui/transpiled/react/Icons/FileTypeSheet'
import IconSlide from 'cozy-ui/transpiled/react/Icons/FileTypeSlide'
import IconText from 'cozy-ui/transpiled/react/Icons/FileTypeText'
import IconVideo from 'cozy-ui/transpiled/react/Icons/FileTypeVideo'
import IconZip from 'cozy-ui/transpiled/react/Icons/FileTypeZip'

import ContactsIcon from 'cozy-ui/transpiled/react/Icons/Contacts'
import FileTypeNoteIcon from 'cozy-ui/transpiled/react/Icons/FileTypeNote'

import { getFileMimetype } from './getFileMimetype'
import EncryptedFolderIcon from './EncryptedFolderIcon'
// import IconEncryptedFolder from 'modules/views/Folder/EncryptedFolderIcon'

export const getIconForSearchResult = (searchResult) => {
  console.log('getIconForSearchResult', searchResult)
  if (searchResult.type === 'notes') {
    return {
      type: 'component',
      component: FileTypeNoteIcon
    }
  }

  if (searchResult.type === 'drive') {
    return {
      type: 'component',
      component: getDriveMimeTypeIcon(
        searchResult.doc.type === 'directory',
        searchResult.doc.name,
        searchResult.doc.mime
      )
    }
  }

  if (searchResult.type === 'contacts') {
    return {
      type: 'component',
      component: ContactsIcon
    }
  }

  if (searchResult.doc.type === 'io.cozy.apps') {
    console.log('APP', searchResult)
    return {
      type: 'app',
      app: searchResult.doc
    }
  }

  return {
    type: 'unknown'
  }
}

/**
 * Returns the appropriate icon for a given file based on its mime type and other properties.
 *
 * @param {boolean} isDirectory - Indicates whether the file is a directory.
 * @param {string} name - The name of the file.
 * @param {string} mime - The mime type of the file.
 * @param {Object} [options] - Additional options.
 * @param {boolean} [options.isEncrypted] - Indicates whether the file is encrypted. Default is false.
 * @returns {import('react').ReactNode} - The icon corresponding to the file's mime type.
 */
const getDriveMimeTypeIcon = (
  isDirectory,
  name,
  mime,
  { isEncrypted = false } = {}
) => {
  if (isEncrypted) {
    return EncryptedFolderIcon
  }
  if (isDirectory) {
    return IconFolder
  } else if (/\.cozy-note$/.test(name)) {
    return IconNote
  } else {
    const iconsByMimeType = {
      audio: IconAudio,
      bin: IconBin,
      code: IconCode,
      image: IconImage,
      pdf: IconPdf,
      slide: IconSlide,
      sheet: IconSheet,
      text: IconText,
      video: IconVideo,
      zip: IconZip
    }
    const type = getFileMimetype(iconsByMimeType)(mime, name)
    return get(iconsByMimeType, type, IconFiles)
  }
}
