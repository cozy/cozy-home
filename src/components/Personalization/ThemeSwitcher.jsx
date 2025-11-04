import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'

import { useClient, useQuery } from 'cozy-client'
import { buildSettingsInstanceQuery } from './queries'

import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'

import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import SunIcon from './icons/SunIcon'
import MoonIcon from './icons/MoonIcon'

export const ThemeSwitcher = () => {
  const client = useClient()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const colorSchemeValue = instance?.colorScheme || 'auto'

  const options = [
    {
      value: 'light',
      icon: SunIcon
    },
    {
      value: 'dark',
      icon: MoonIcon
    },
    {
      value: 'auto',
      icon: DevicesIcon
    }
  ]

  const handleChange = async v => {
    const newColorScheme = options[v].value

    await client.save({
      _rev: instance.meta.rev,
      ...instance,
      attributes: {
        ...instance.attributes,
        colorScheme: newColorScheme
      }
    })
  }

  if (!colorSchemeValue) return null

  return (
    <div className="u-w-4">
      <Tabs
        narrowed
        segmented
        value={options.findIndex(o => o.value == colorSchemeValue)}
        onChange={(_, v) => handleChange(v)}
      >
        {options.map(option => (
          <Tab
            key={option.value}
            label={<Icon icon={option.icon} />}
            id={option.value}
          />
        ))}
      </Tabs>
    </div>
  )
}
