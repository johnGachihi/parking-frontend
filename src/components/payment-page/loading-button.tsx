import { PropsWithChildren } from "react"
import Button, { ButtonProps } from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

type LoadingButtonProps = PropsWithChildren<{ loading?: boolean }> & ButtonProps
function LoadingButton({
  children,
  loading = false,
  disabled,
  ...buttonProps
}: LoadingButtonProps) {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress color="inherit" size={16} /> : undefined
      }
    >
      {loading ? "Loading..." : children}
    </Button>
  )
}

export default LoadingButton
