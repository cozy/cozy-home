import React, { useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Button from 'cozy-ui/transpiled/react/Buttons'

import styles from './Personalization.styl'
import Wallpaper from './Wallpaper'

import { Transition } from 'react-transition-group'
import { useClient } from 'cozy-client'
import { ThemeSwitcher } from './ThemeSwitcher'

export const PersonalizationModal = () => {
  const client = useClient()
  const [tabSelected, setTabSelected] = useState(0)

  const tabs = [
    {
      label: 'Wallpaper',
      icon: 'palette',
      onClick: () => {
        setTabSelected(0)
      },
      enabled: false,
      component: <Wallpaper client={client} />
    }
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
        position: 'relative'
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
          margin: 16
        }}
      >
        {tabs.map((tab, index) => (
          <Button
            key={tab.label}
            className={`u-bdrs-circle ${styles['personalizationTabButton']} ${
              tabSelected === index
                ? styles['personalizationTabButton--selected']
                : ''
            }`}
            label={<Icon icon={tab.icon} size={14} />}
            size="small"
            variant={'ghost'}
            onClick={tab.onClick}
          />
        ))}

        <ThemeSwitcher />
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {tabs
          .filter(tab => tab.component)
          .map((tab, index) => (
            <Transition
              in={tabSelected === index}
              timeout={0}
              key={tab.label}
              mountOnEnter
            >
              {state => (
                <div
                  key={tab.label}
                  className={`${styles[`personalization-tab`]} ${
                    styles[`personalization-tab--${state}`]
                  }`}
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
