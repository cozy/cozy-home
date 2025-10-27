import React, { useRef, useState } from "react";

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { Fade, Grow, Popper } from '@material-ui/core';

import styles from './Personalization.styl'
import flag from "cozy-flags";
import Wallpaper from "./Wallpaper";

import { Transition } from 'react-transition-group';
import { useWallpaperContext } from "@/hooks/useWallpaperContext";
import { useClient, useQuery } from "cozy-client";
import Widget from "./Widget";
import { buildSettingsInstanceQuery } from "./queries";
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n";

import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'

import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export const ThemeSwitcher = () => {
  const client = useClient();
  const { t } = useI18n();
  const [tabSelected, setTabSelected] = useState(0);

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance, ...instanceQueryLeft } = useQuery(
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
    console.log("newcs:", newColorScheme)

    await client.save({
      _rev: instance.meta.rev,
      ...instance,
      attributes: {
        ...instance.attributes,
        colorScheme: newColorScheme
      }
    })
  }

  if (!colorSchemeValue) return null;
  
  return (
    <div
      style={{
        width: 120
      }}
    >
      <Tabs
        narrowed
        segmented
        value={options.findIndex((o) => o.value == colorSchemeValue)}
        onChange={(e, v) => handleChange(v)}
      >
        {options.map(option => (
          <Tab
            label={(
              <Icon icon={option.icon} />
            )}
            id={option.value}
          />
        ))}
      </Tabs>
    </div>
  )
}