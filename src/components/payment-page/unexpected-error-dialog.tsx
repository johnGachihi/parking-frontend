import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import AccordionDetails from "@mui/material/AccordionDetails"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { ErrorResponse } from "../../network/error-response"
import { useMemo } from "react"

type Props = {
  open: boolean
  onClose: () => void
  close: () => void
  error: null | Error | ErrorResponse
}
function UnexpectedErrorDialog({ open, onClose, error, close }: Props) {
  const unexpectedCompletePaymentError = useMemo(() => {
    if (error instanceof ErrorResponse) {
      return (
        <>
          <Typography variant="body2">{error.title}.</Typography>
          <Typography variant="body2">{error.detail}.</Typography>
          <Typography variant="body2">Status: {error.status}</Typography>
        </>
      )
    } else if (error instanceof Error) {
      return <Typography variant="body2">{error.message}</Typography>
    } else {
      return <Typography variant="body2">--</Typography>
    }
  }, [error])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Unexpected error experienced
      </DialogTitle>
      <DialogContent>
        Try refreshing the tab. If error persists, please seek assistance.
        <Accordion sx={{ mt: 3, boxShadow: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">For developer:</Typography>
          </AccordionSummary>
          <AccordionDetails>{unexpectedCompletePaymentError}</AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UnexpectedErrorDialog
