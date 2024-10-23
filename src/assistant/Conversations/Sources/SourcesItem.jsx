import React from 'react'

import { useClient, generateWebLink } from 'cozy-client'
import { isNote } from 'cozy-client/dist/models/file'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { getDriveMimeTypeIcon } from 'assistant/Search/getIconForSearchResult'

import styles from './styles.styl'

const SourcesItem = ({ file }) => {
  const client = useClient()

  const docUrl = generateWebLink({
    slug: isNote(file) ? 'notes' : 'drive',
    cozyUrl: client?.getStackClient().uri,
    subDomainType: client?.getInstanceOptions().subdomain,
    hash: isNote(file)
      ? `/n/${file._id}`
      : `/folder/${file.dir_id}/file/${file._id}`
  })

  return (
    <ListItem
      className={styles['sourcesItem']}
      component="a"
      href={docUrl}
      target="_blank"
      button
    >
      <ListItemIcon>
        <Icon
          icon={getDriveMimeTypeIcon(false, file.name, file.mime)}
          size={32}
        />
      </ListItemIcon>
      <ListItemText
        primary={file.name}
        secondary={file.path.replace(file.name, '')}
      />
    </ListItem>
  )
}

export default SourcesItem
