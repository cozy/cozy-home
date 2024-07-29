import React from 'react'
import get from 'lodash/get'
import cx from 'classnames'

import type { IOCozyFile, IOCozyKonnector } from 'cozy-client/types/types'
import { nameToColor } from 'cozy-ui/react/Avatar/helpers'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Grid from 'cozy-ui/transpiled/react/Grid'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import { STATUS } from 'components/KonnectorHelpers'

interface SectionAppGroupProps {
  items: IOCozyFile[] | IOCozyKonnector[]
}

interface SectionAppTileProps {
  item: (IOCozyFile | IOCozyKonnector) & {
    status?: number
  }
}

const typedNameToColor = nameToColor as (name: string) => string

const SectionAppTile = ({ item }: SectionAppTileProps): JSX.Element => {
  const icon = get(item, 'attributes.metadata.icon') as string
  const iconMimeType = get(item, 'attributes.metadata.iconMimeType') as string

  return (
    <Grid item xs={6} key={item.id} className="section-app-group-grid">
      {item.type === 'konnector' ||
      item._type === 'io.cozy.apps.suggestions' ? (
        <AppIcon
          app={(item as IOCozyKonnector).slug}
          type="konnector"
          className={cx('item-grid-icon', {
            ghost: item.status === STATUS.NO_ACCOUNT
          })}
        />
      ) : icon ? (
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
          <Typography variant="subtitle2" align="center">
            {item.name?.[0].toUpperCase()}
          </Typography>
        </div>
      )}
    </Grid>
  )
}

const SectionAppGroup = ({ items }: SectionAppGroupProps): JSX.Element => {
  return (
    <Grid container spacing={1} className="section-app-group">
      {items.map(item => (
        <SectionAppTile key={item.id ?? item.name} item={item} />
      ))}
    </Grid>
  )
}

export default SectionAppGroup
