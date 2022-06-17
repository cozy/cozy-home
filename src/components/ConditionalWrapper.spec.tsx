import React from 'react'
import { render } from '@testing-library/react'
import { ConditionalWrapper } from './ConditionalWrapper'

const Component = (): JSX.Element => <div>Component</div>

const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => (
  <section>
    <header>Wrapper</header>
    {children}
  </section>
)

it('should render without Wrapper by default', () => {
  const { queryByText } = render(
    <ConditionalWrapper
      wrapper={(children): JSX.Element => <Wrapper>{children}</Wrapper>}
    >
      <Component />
    </ConditionalWrapper>
  )

  expect(queryByText('Wrapper')).toBe(null)
  expect(queryByText('Component')).toBeDefined()
})

it('should not render with Wrapper if provided but not needed', () => {
  const { queryByText } = render(
    <ConditionalWrapper
      condition={false}
      wrapper={(children): JSX.Element => <Wrapper>{children}</Wrapper>}
    >
      <Component />
    </ConditionalWrapper>
  )

  expect(queryByText('Wrapper')).toBe(null)
  expect(queryByText('Component')).toBeDefined()
})

it('should render with Wrapper if provided', () => {
  const { queryByText } = render(
    <ConditionalWrapper
      condition={true}
      wrapper={(children): JSX.Element => <Wrapper>{children}</Wrapper>}
    >
      <Component />
    </ConditionalWrapper>
  )

  expect(queryByText('Wrapper')).toBeDefined()
  expect(queryByText('Component')).toBeDefined()
})
