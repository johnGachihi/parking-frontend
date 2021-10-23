import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"

type Props = {
  open: boolean
  onClose: () => void
  startNewSession: () => void
}

function PaymentSessionExpiredDialog({
  open,
  onClose,
  startNewSession,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        The payment session has expired! Click 'Start New Session' to restart
        the session.
      </DialogContent>
      <DialogActions>
        <Button onClick={startNewSession}>Start New Session</Button>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentSessionExpiredDialog
