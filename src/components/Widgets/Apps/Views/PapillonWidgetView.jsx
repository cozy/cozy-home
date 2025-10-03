import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import React, { useMemo, useState } from 'react'
import { buildAccountsQuery, buildGradesQuery } from '../Queries/PapillonQueries'

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
import WidgetTabs, { UnimplementedWidgetView } from '../../Atoms/WidgetTabs'

export const PapillonWidgetView = () => {
  const [selectedTab, setSelectedTab] = useState(2)
  const { type } = useCozyTheme()
  
  const tabs = [
    {
      label: 'Cours',
      icon: 'calendar',
      render: <UnimplementedWidgetView />
    },
    {
      label: 'Devoirs',
      icon: 'checkbox',
      render: <UnimplementedWidgetView />
    },
    {
      label: 'Notes',
      icon: 'trophy',
      render: <PapGrades />
    }
  ]

  return (
    <WidgetTabs
      tabs={tabs}
    />
  )
}

export const PapGrades = () => {
  const client = useClient()

  const accountsQuery = buildAccountsQuery()

  const { data: accounts, accountsFetchStatus } = useQuery(
    accountsQuery.definition,
    accountsQuery.options
  )

  const currentAccount = accounts && accounts.length > 0 ? accounts[accounts.length - 1] : null

  const gradesQuery = buildGradesQuery(
    currentAccount?.cozyMetadata?.sourceAccountIdentifier
  )
  const { data: timeseries, fetchStatus } = useQuery(
    gradesQuery.definition,
    gradesQuery.options
  )

  const grades = useMemo(() => {
    if (!timeseries || timeseries.length === 0) return []

    return timeseries
      .map(series => series.series.map(grade => ({...grade, timeseries: series})))
      .flat()
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date desc
      .slice(0, 10) // keep only 10 first
  }, [timeseries])

  const openPapillonToGrade = (grade) => {
    window.location.href = useAppLinkWithStoreFallback('papillon', client, `/grades/grade/${grade.timeseries._id}/${grade.id}`).url
  }

  return (
    <List dense style={{ padding: 0 }}>
      {grades.map(grade => (
        <ListItem key={grade.id} button size="small">
          <div>
            <Typography variant="h4" color="textPrimary">
              {getSubjectName(grade.timeseries.subject).emoji || '📚'}
            </Typography>
          </div>
          <ListItemText
            primary={grade.label ?? "Untitled"}
            secondary={getSubjectName(grade.timeseries.subject).pretty}
          />
            <div
              className='u-flex u-flex-row'
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Typography variant="button" color="textPrimary">
                {grade.value.student.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                /{grade.value.outOf}
              </Typography>
            </div>
        </ListItem>
      ))}
    </List>
  )
}
