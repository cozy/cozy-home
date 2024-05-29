declare module 'cozy-ui/transpiled/react/*' {
  const component: (props: Record<string, unknown>) => JSX.Element
  export default component
}

declare module 'cozy-ui/transpiled/react/CozyDialogs' {
  import { ReactNode } from 'react'

  interface ConfirmDialogProps {
    actions?: ReactNode
    actionsLayout?: 'row' | 'column'
    content?: string
    disableGutters?: boolean
    disableTitleAutoPadding?: boolean
    onBack?: () => void
    onClose?: () => void
    open?: boolean
    size?: 'small' | 'medium' | 'large'
    title?: string
  }

  const ConfirmDialog: (props: ConfirmDialogProps) => JSX.Element

  export { ConfirmDialog, ConfirmDialogProps }
}

declare module 'cozy-ui/transpiled/react/providers/CozyTheme' {
  import { ReactNode } from 'react'

  interface CozyThemeProps {
    variant?: 'normal' | 'inverted'
    children?: ReactNode
    className?: string
  }

  interface CozyTheme {
    type: string
    variant: string
  }

  export default function CozyTheme(props: CozyThemeProps): JSX.Element
  export function useCozyTheme(): CozyTheme
}

declare module 'cozy-ui/transpiled/react/providers/I18n' {
  export const useI18n: () => { t: (key: string) => string; lang: string }
}

declare module 'cozy-ui/transpiled/react/Buttons' {
  export default function Button(props: Record<string, unknown>): JSX.Element
}

declare module 'cozy-ui/transpiled/react/Icons/Help' {
  import { SVGAttributes } from 'react'

  export default function HelpIcon(
    props?: Omit<SVGAttributes<SVGElement>, 'children'>
  ): JSX.Element
}

declare module 'cozy-ui/transpiled/react/ActionsMenu/Actions' {
  type Action = {
    name: string
    action?: (
      doc: Section,
      opts: { handleAction: HandleActionCallback }
    ) => void
    Component: React.FC
  }

  export function divider(): Action

  export function makeActions(
    arg1: (() => Action)[]
  ): Record<string, () => Action>
}

declare module 'cozy-ui/transpiled/react/styles' {
  export function makeStyles<T>(styles: T): T
}
