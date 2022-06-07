import React from 'react'

type BackgroundContainerProps = { backgroundURL?: string; children?: void }

type BackgroundContainerComputedProps = {
  className: string
  style?: { backgroundImage: string }
}

const makeProps = (
  backgroundURL?: string
): BackgroundContainerComputedProps => ({
  className: 'background-container',
  ...(backgroundURL && {
    style: { backgroundImage: `url(${backgroundURL})` }
  })
})

export const BackgroundContainer = ({
  backgroundURL
}: BackgroundContainerProps): JSX.Element => (
  <div {...makeProps(backgroundURL)} />
)
