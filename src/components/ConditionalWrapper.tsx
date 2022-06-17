interface ConditionalWrapperProps {
  condition?: boolean
  wrapper: (children: JSX.Element) => JSX.Element
  children: JSX.Element
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children
}: ConditionalWrapperProps): JSX.Element =>
  condition ? wrapper(children) : children
