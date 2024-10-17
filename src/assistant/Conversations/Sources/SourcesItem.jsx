import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import MultiFilesIcon from 'cozy-ui/transpiled/react/Icons/MultiFiles'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import styles from './styles.styl'

const SourcesItem = ({ doc }) => {
  return (
    <ListItem className={styles['sourcesItem']} button onClick={() => {}}>
      <ListItemIcon>
        <Icon icon={MultiFilesIcon} size={32} />
      </ListItemIcon>
      <ListItemText
        primary="2_DispositionParticulières"
        secondary="/Admin/MACIF"
      />
    </ListItem>
  )
}

export default SourcesItem
