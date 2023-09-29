import React, { Fragment } from 'react'

import { useClient, generateWebLink } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import BottomSheet, {
  BottomSheetItem
} from 'cozy-ui/transpiled/react/BottomSheet'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

export const ActionsBottomSheet = ({ anchorRef, hideMenu, actionsLists }) => {
  const { t } = useI18n()
  const client = useClient()

  const { origin: cozyUrl } = new URL(client.getStackClient().uri)
  const { subdomain: subDomainType } = client.getInstanceOptions()

  return (
    <BottomSheet anchorElRef={anchorRef} backdrop onClose={hideMenu}>
      <BottomSheetItem disableGutters>
        <div className="u-flex u-flex-justify-center u-pb-1">
          <Typography variant="h6">{t('addButton.add')}</Typography>
        </div>
        <Divider />
        {actionsLists.map((actionsList, index) => {
          const listContent = actionsList.map(action => {
            const url = generateWebLink({
              pathname: '/',
              cozyUrl,
              hash: action.path,
              slug: action.slug,
              subDomainType
            })

            return (
              <AppLinker app={action.app} href={url} key={action.id}>
                {({ href, onClick }) => (
                  <ListItem
                    button
                    component="a"
                    href={href}
                    onClick={e => {
                      onClick(e)
                      hideMenu()
                    }}
                  >
                    <ListItemIcon>
                      <Icon icon={action.icon} size={32} />
                    </ListItemIcon>
                    <ListItemText primary={t(action.id)} />
                  </ListItem>
                )}
              </AppLinker>
            )
          })

          return (
            <Fragment key={`fragment-${index}`}>
              <List key={`list-${index}`}>{listContent}</List>
              {index < actionsLists.length - 1 && (
                <Divider key={`divider-${index}`} variant="inset" />
              )}
            </Fragment>
          )
        })}
      </BottomSheetItem>
    </BottomSheet>
  )
}

export default ActionsBottomSheet
