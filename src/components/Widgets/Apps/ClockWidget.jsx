import React, { useState, useEffect } from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Widget } from '../WidgetsWrapper'

const lz = (num) => (num < 10 ? `0${num}` : num)

export const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const seconds = currentTime.toLocaleTimeString([], { second: '2-digit' })
  const date = currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Widget
      title="Clock"
      icon="clock"
    >
      <div
        className="u-flex u-flex-column u-w-100 u-h-100"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '0.2rem',
        }}
      >
        <div className="u-flex u-flex-row" style={{ alignItems: 'baseline', letterSpacing: '0.05em' }}>
          <Typography variant="h2">
            {time}
          </Typography>
          <Typography variant="h4" color="textSecondary">
            :{lz(seconds)}
          </Typography>
        </div>
        <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
          {date}
        </Typography>
      </div>
    </Widget>
  )
}