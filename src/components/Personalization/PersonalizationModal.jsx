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
import { ThemeSwitcher } from "./ThemeSwitcher";

export const PersonalizationModal = () => {
  const client = useClient();
  const { t } = useI18n();
  const [tabSelected, setTabSelected] = useState(0);

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance, ...instanceQueryLeft } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  console.log("Inst : ", instance)

  const tabs = [
      {
        label: 'Wallpaper',
        icon: 'palette',
        onClick: () => { setTabSelected(0) },
        enabled: false,
        component: <Wallpaper client={client} />
      },
    ...flag('cozy.widgets.enabled') ? [
      {
        label: 'Widgets',
        icon: 'mosaic',
        onClick: () => { setTabSelected(1) },
        enabled: false,
        component: <Widget client={client} />
      },
    ] : [],
  ]

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 'calc(100% - (16px * 2))',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
          margin: 16,
        }}
      >
        {tabs.map((tab, index) => (
          <Button
            key={tab.label}
            className={`u-bdrs-circle ${styles['personalizationTabButton'] } ${tabSelected === index ? styles['personalizationTabButton--selected'] : ''}`}
            label={<Icon icon={tab.icon} size={14} />}
            size="small"
            variant={"ghost"}
            onClick={tab.onClick}
          />
        ))}

        <ThemeSwitcher />
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {tabs.filter((tab, index) => tab.component).map((tab, index) => (
          <Transition in={tabSelected === index} timeout={0} key={tab.label} mountOnEnter>
            {state => (
              <div
                key={tab.label}
                className={`${styles[`personalization-tab`]} ${styles[`personalization-tab--${state}`]}`}
              >
                {tab.component}
              </div>
            )}
          </Transition>
        ))}
      </div>
    </div>
  )
}