declare module 'cozy-ui/transpiled/react/CozyDialogs' {
  interface ConfirmDialogProps {
    actions?: React.ReactNode
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

declare module 'cozy-ui/transpiled/react/CozyTheme' {
  interface CozyThemeProps {
    variant?: 'normal' | 'inverted'
    children?: JSX.Element
    className?: string
  }
  export default function CozyTheme(props: CozyThemeProps): JSX.Element
}

declare module 'cozy-ui/transpiled/react/I18n' {
  export const useI18n: () => { t: (key: string) => string }
}

declare module 'cozy-ui/transpiled/react/Buttons' {
  export default function Button(props: Record<string, unknown>): JSX.Element
}

declare module 'cozy-ui/transpiled/react/Icons/Help' {
  export default function HelpIcon(
    props?: Omit<React.SVGAttributes<SVGElement>, 'children'>
  ): JSX.Element
}
