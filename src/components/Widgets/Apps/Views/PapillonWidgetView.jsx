import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import React, { useMemo, useState } from 'react'
import { buildAccountsQuery, buildGradesQuery, buildHomeworkQuery, buildTimetableQuery } from '../Queries/PapillonQueries'

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
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import WidgetTabs, { LoadingWidgetView, UnimplementedWidgetView } from '../../Atoms/WidgetTabs'
import { subjectColor } from '../Utils/subjectColor'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'

export const PapillonWidgetView = ({ app, layoutControls, index }) => {
  const [selectedTab, setSelectedTab] = useState(2)
  const { type } = useCozyTheme()

  const accountsQuery = buildAccountsQuery()

  const { data: accounts, accountsFetchStatus } = useQuery(
    accountsQuery.definition,
    accountsQuery.options
  )

  const currentAccount = accounts && accounts.length > 0 ? accounts[accounts.length - 1] : null
  
  const tabs = [
    {
      label: 'Cours',
      icon: 'calendar',
      render: <PapTimetable currentAccount={currentAccount} />
    },
    {
      label: 'Devoirs',
      icon: 'checkbox',
      render: <PapHomeworks currentAccount={currentAccount} />
    },
    {
      label: 'Notes',
      icon: 'trophy',
      render: <PapGrades currentAccount={currentAccount} />
    }
  ]

  return (
    <WidgetTabs
      app={app}
      index={index}
      layoutControls={layoutControls}
      tabs={tabs}
    />
  )
}

export const PapTimetable = ({ currentAccount }) => {
  const client = useClient()
  const { t } = useI18n()

  const [baseDate, setBaseDate] = useState(new Date())

  const startDate = useMemo(() => {
    const date = new Date(baseDate)

    date.setHours(0, 0, 0, 0)
    return date
  }, [baseDate])

  const endDate = useMemo(() => {
    const date = new Date(baseDate)
    date.setHours(23, 59, 59, 999)
    return date
  }, [baseDate])

  const timetableQuery = buildTimetableQuery(
    currentAccount?.cozyMetadata?.sourceAccountIdentifier,
    startDate,
    endDate
  )
  const { data: courses, fetchStatus } = useQuery(
    timetableQuery.definition,
    timetableQuery.options
  )

  if (fetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!courses || courses.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Papillon.NoCourses')} />
    )
  }

  return (
    <List dense style={{ padding: 0 }}>
      {courses && courses.length > 0 && courses.map(course => <PapTimetableItem key={course.id} client={client} course={course} />)}
    </List>
  )
}

export const PapTimetableItem = ({ client, course, clock }) => {
  const openURL = useAppLinkWithStoreFallback('papillon', client, `#/timetable/course/${course.id}`).url;

  return (
    <ListItem key={course.id} button size="small"
      onClick={() => { window.location.href = openURL }}
      disableGutters
      style={{
        gap: 0
      }}
    >
      {clock && (
        <div
          style={{
            width: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 0,
            marginLeft: 0
          }}
        >
          <Typography variant="caption" color="textPrimary" style={{ fontWeight: 'bold' }}>
            {new Date(course.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(course.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </div>
      )}
      <div
        style={{
          backgroundColor: subjectColor(course.subject),
          width: 5,
          height: 42,
          borderRadius: 6,
          marginLeft: !clock ? 12 : 0,
          marginRight: 12
        }}
      />
      <ListItemText
        primary={
          <>
            {!clock &&
              <Typography variant="overline" color="textSecondary">
                {new Date(course.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(course.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            }
            <Typography variant="body2" color="textPrimary">
              {course.label ?? "Untitled"}
            </Typography>
          </>
        }
        secondary={`${course.organizer} — ${course.location}`}
      />
    </ListItem>
  )
} 

export const PapHomeworks = ({ currentAccount }) => {
  const client = useClient()
  const { t } = useI18n()

  const homeworkQuery = buildHomeworkQuery(
    currentAccount?.cozyMetadata?.sourceAccountIdentifier
  )
  const { data: homeworksData, fetchStatus } = useQuery(
    homeworkQuery.definition,
    homeworkQuery.options
  )

  const homeworks = useMemo(() => {
    return homeworksData ? homeworksData.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) : []
  }, [homeworksData])

  const groupedHomeworks = useMemo(() => {
    const days = [];
    
    homeworks.forEach(homework => {
      const date = new Date(homework.dueDate.replace(
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, 
        '$1-$2-$3T$4:$5:$6Z'
      ));
      date.setHours(0, 0, 0, 0); // Normalize to the start of the day
      const dateKey = date.toISOString();

      let dayGroup = days.find(d => d.date === dateKey);
      if (!dayGroup) {
        dayGroup = { date: dateKey, homeworks: [] };
        days.push(dayGroup);
      }
      dayGroup.homeworks.push(homework);
    });
    return days;
  }, [homeworks])

  if (fetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!homeworks || homeworks.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Papillon.NoHomeworks')} />
    )
  }

  return (
    <>
      {groupedHomeworks.map(dayGroup => (
        <List
          dense
          style={{ padding: 0 }}
          subheader={
            <ListSubheader
              style={{
                marginBottom: 0,
                padding: '4px 10px'
              }}
            >
              <Typography
                variant="caption"
                color="textSecondary"
              >
                {new Date(dayGroup.date).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </Typography>
            </ListSubheader>
          }
        >
          {dayGroup.homeworks.map(homework => <PapHomeworksItem key={homework.id} client={client} homework={homework} />)}
        </List>
      ))}
    </>
  )
}

export const PapHomeworksItem = ({ client, homework }) => {
  const openURL = useAppLinkWithStoreFallback('papillon', client, `#/homeworks/homework/${homework.id}`).url;

  const trunactedSummary = homework.summary && homework.summary.length > 50
    ? homework.summary.substring(0, 47) + '...'
    : homework.summary;

  if (!trunactedSummary) {
    return null;
  }

  return (
    <ListItem key={homework.id} button size="small"
      onClick={() => { window.location.href = openURL }}
      disableGutters={true}
      style={{
        gap: 0,
        display: "flex",
        padding: "6px 0"
      }}
    >
      <Checkbox
        checked={homework.completed}
        disabled={!homework.completed}
        size="small"
        style={{ marginRight: 6, marginLeft: 4, pointerEvents: 'none' }}
      />
      <div
        style={{
          flex: 1,
          width: "100%"
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 9,
            overflow: 'hidden',
          }}
        >
          <div 
            style={{
              backgroundColor: subjectColor(homework.subject),
              width: 7,
              height: 7,
              borderRadius: 6,
            }}
          />
          <Typography variant="caption" color="textSecondary" style={{ ellipsizeMode: 'tail', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
            {homework.label ?? "Untitled"}
          </Typography>
        </div>
        <Typography variant="subtitle1" color="textPrimary">
          {trunactedSummary}
        </Typography>
      </div>
    </ListItem>
  )
} 

export const PapGrades = ({ currentAccount }) => {
  const client = useClient()
  const { t } = useI18n()

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

  if (fetchStatus === 'loading') {
    return <LoadingWidgetView />
  }

  if (!grades || grades.length === 0) {
    return (
      <UnimplementedWidgetView label={t('Widget.Papillon.NoGrades')} />
    )
  }

  return (
    <List dense style={{ padding: 0 }}>
      {grades.map(grade => <GradeItem key={grade.id} client={client} grade={grade} />)}
    </List>
  )
}

export const GradeItem = ({ client, grade }) => {
  const openURL = useAppLinkWithStoreFallback('papillon', client, `#/grades/grade/${grade.timeseries._id}/${grade.id}`).url;

  return (
    <ListItem key={grade.id} button size="small"
      onClick={() => { window.location.href = openURL }}
    >
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
  )
}