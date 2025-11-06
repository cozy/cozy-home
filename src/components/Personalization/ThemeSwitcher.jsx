import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'

import { useClient, useQuery } from 'cozy-client'
import log from 'cozy-logger'
import { buildSettingsInstanceQuery } from './queries'

import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'

import { themeOptions } from './constants'

export const ThemeSwitcher = () => {
  const client = useClient()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const colorSchemeValue = instance?.colorScheme || 'auto'

  const handleChange = async v => {
    const newColorScheme = themeOptions[v].value

    try {
      await client.save({
        ...instance,
        _rev: instance.meta.rev,
        attributes: {
          ...instance.attributes,
          colorScheme: newColorScheme
        }
      })
    } catch (error) {
      log('error', `Failed to save color scheme: ${error}`)
    }
  }

  if (!colorSchemeValue) return null

  return (
    <div className="u-w-4">
      <Tabs
        narrowed
        segmented
        value={themeOptions.findIndex(o => o.value === colorSchemeValue)}
        onChange={(_, v) => handleChange(v)}
      >
        {themeOptions.map(option => (
          <Tab
            key={option.value}
            label={<Icon icon={option.icon} />}
            id={option.value}
            arial-label={`${option.value} theme`}
          />
        ))}
      </Tabs>
    </div>
  )
}
