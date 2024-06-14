import React from 'react'
import get from 'lodash/get'

import { FileData } from 'components/Shortcuts/types'
import { nameToColor } from 'cozy-ui/react/Avatar/helpers'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Grid from 'cozy-ui/transpiled/react/Grid'

interface SectionAppGroupProps {
  items: FileData[]
}

interface SectionAppTileProps {
  item: FileData
}

const typedNameToColor = nameToColor as (name: string) => string

const SectionAppTile = ({ item }: SectionAppTileProps): JSX.Element => {
  const icon = get(item, 'attributes.metadata.icon') as string
  const iconMimeType = get(item, 'attributes.metadata.iconMimeType') as string

  return (
    <Grid item xs={6} key={item.id} className="section-app-group-grid">
      {icon ? (
        <img
          src={
            iconMimeType
              ? `data:${iconMimeType};base64,${icon}`
              : `data:image/svg+xml;base64,${window.btoa(icon)}`
          }
          alt={item.name}
          className="section-app-group-icon"
        />
      ) : (
        <div
          style={{ backgroundColor: typedNameToColor(item.name) }}
          className="section-app-group-tile"
        >
          <Typography variant="subtitle2" align="center" className="u-white">
            {item.name[0].toUpperCase()}
          </Typography>
        </div>
      )}
    </Grid>
  )
}

const SectionAppGroup = ({ items }: SectionAppGroupProps): JSX.Element => {
  return (
    <Grid container spacing={1}>
      {items.map(item => (
        <SectionAppTile key={item.id} item={item} />
      ))}
    </Grid>
  )
}

export default SectionAppGroup
