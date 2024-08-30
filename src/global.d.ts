declare module 'cozy-harvest-lib'
declare module 'cozy-ui/transpiled/react/providers/Breakpoints' {
  export function BreakpointsProvider(props: {
    children: React.ReactNode
  }): JSX.Element
  export default function useBreakpoints(): { isMobile: boolean }
}
declare module 'cozy-ui/transpiled/react/Spinner'
declare module 'cozy-ui/transpiled/react/SquareAppIcon'
declare module 'assets/*' {
  const assets: string
  export default assets
}

declare module 'react-swipeable-views'
