type SnackbarKey = string | number

type SnackbarOption = {
  autoHideDuration?: number
  className?: string
  variant?: 'default' | 'error' | 'info' | 'success' | 'warning'
  disableWindowBlurListener?: boolean
  hideIconVariant?: boolean
  preventDuplicate?: boolean
  style?: React.CSSProperties
  onClose?: () => void
  onExit?: () => void
  onExited?: () => void
}

interface Window {
  dataLayer: any
  snackbar: {
    open: (message: string | React.ReactNode, options?: SnackbarOption) => SnackbarKey
    close: (key: SnackbarKey) => void
  }
}
