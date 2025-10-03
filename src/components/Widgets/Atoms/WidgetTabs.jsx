import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import React, { useMemo, useState } from 'react'
import { buildAccountsQuery, buildGradesQuery } from '../../Queries'

import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'
import { getSubjectName } from '../../Utils/subjectName'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { LinearProgress, CircularProgress } from 'cozy-ui/transpiled/react/Progress';

export const WidgetTabs = ({
  tabs,
  defaultTab = 0
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab)
  const { type } = useCozyTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      <div
        style={{
          padding: '8px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 8,
          borderColor: type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderRightWidth: 1,
          borderRightStyle: 'solid',
        }}
      >
        {tabs.map((tab, index) => (
          <Button
            key={tab.label}
            onClick={() => setSelectedTab(index)}
            label={
              <Icon
                icon={tab.icon}
                color={selectedTab === index ? 'var(--primaryColor)' : undefined}
              />
            }
            variant={selectedTab === index ? 'ghost' : 'text'}
            size="small"
            color={selectedTab === index ? 'primary' : 'inherit'}
            style={{
              width: '2rem',
              maxWidth: '2rem',
              minWidth: '2rem',
              height: '2rem',
              borderRadius: 8,
              padding: 0,
            }}
          />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
        }}
      >
        {useMemo(() => {
          const tab = tabs && tabs[selectedTab]
          if (!tab) return null
          return typeof tab.render === 'function' ? tab.render() : tab.render
        }, [selectedTab, tabs && tabs[selectedTab] && tabs[selectedTab].render])}
      </div>
    </div>
  )
}

export const UnimplementedWidgetView = ({
  label = "Unimplemented"
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ marginBottom: '0rem' }} variant="body2" color="textSecondary">
        {label}
      </Typography>
    </div>
  )
}

export const LoadingWidgetView = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  )
}

export default WidgetTabs
