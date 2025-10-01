import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import React, { useMemo, useState } from 'react'
import { buildAccountsQuery, buildGradesQuery } from '../Queries'

import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'
import { getSubjectName } from '../Utils/subjectName'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

export const PapillonWidgetView = () => {
  const [selectedTab, setSelectedTab] = useState(2)
  const { type } = useCozyTheme()
  
  const tabs = [
    {
      label: 'Cours',
      icon: 'calendar'
    },
    {
      label: 'Devoirs',
      icon: 'checkbox'
    },
    {
      label: 'Notes',
      icon: 'trophy'
    },
    {
      label: 'Vie sco.',
      icon: 'justice'
    }
  ]

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
          justifyContent: 'center',
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
            color={selectedTab === index ? 'primary' : 'text'}
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
        { selectedTab === 2 ? (
          <PapGrades />
        ) : (
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
              Unimplemented
            </Typography>
          </div>
        ) }
      </div>
    </div>
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
      .slice(0, 5) // keep only 5 first
  }, [timeseries])

  console.log('PapillonWidgetView grades', grades)

  const openPapillonToGrade = (grade) => {
    window.location.href = useAppLinkWithStoreFallback('papillon', client, `/grades/grade/${grade.timeseries._id}/${grade.id}`).url
  }

  return (
    <List dense style={{ padding: 0 }}>
      {grades.map(grade => (
        <ListItem key={grade.id} button size="small">
          <div>
            <Typography variant="h5" color="textPrimary">
              {getSubjectName(grade.timeseries.subject).emoji || '📚'}
            </Typography>
          </div>
          <ListItemText
            primary={grade.label ?? "Untitled"}
            secondary={getSubjectName(grade.timeseries.subject).pretty}
          />
          <ListItemSecondaryAction>
            <div
              className='u-flex u-flex-row'
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginRight: 16
              }}
            >
              <Typography variant="button" color="textPrimary">
                {grade.value.student.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                /{grade.value.outOf}
              </Typography>
            </div>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
