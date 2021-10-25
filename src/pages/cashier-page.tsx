import PageTemplate from "../components/page-template/page-template"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import useStartPayment from "../network/start-payment"
import useCompletePayment from "../network/complete-payment"
import { useEffect, useMemo, useState } from "react"
import {
  ErrorResponse,
  ValidationErrorResponse,
} from "../network/error-response"
import LoadingButton from "../components/payment-page/loading-button"
import UnexpectedErrorDialog from "../components/payment-page/unexpected-error-dialog"
import { useTimeUntilPaymentSessionExpiry } from "../components/payment-page/use-time-until-payment-session-expiry"
import PaymentSessionExpiredDialog from "../components/payment-page/payment-session-expired-dialog"

function CashierPage() {
  const [ticketCodeInput, setTicketCodeInput] = useState<string>("")
  const [paymentSessionInProgress, setPaymentSessionInProgress] =
    useState(false)
  const startPaymentQuery = useStartPayment()
  const startPayment = () => startPaymentQuery.mutate(ticketCodeInput)

  const ticketCodeInputErrorMessage = useTicketCodeInputError(
    startPaymentQuery.isError,
    startPaymentQuery.error
  )
  const completePaymentQuery = useCompletePayment()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const handleCloseErrorDialog = () => setIsErrorDialogOpen(false)

  const timeUntilPaymentSessionExpiry = useTimeUntilPaymentSessionExpiry(
    startPaymentQuery.data?.paymentSession.expiryTime,
    paymentSessionInProgress,
    5
  )

  const [
    isPaymentSessionExpiryDialogOpen,
    setIsPaymentSessionExpiryDialogOpen,
  ] = useState(false)

  useEffect(() => {
    if (startPaymentQuery.isSuccess) {
      setPaymentSessionInProgress(true)
    }
  }, [startPaymentQuery.isSuccess])

  useEffect(() => {
    if (completePaymentQuery.isSuccess) {
      setPaymentSessionInProgress(false)
      setTicketCodeInput("")
      setIsSnackbarOpen(true)
    }
  }, [completePaymentQuery.isSuccess])

  useEffect(() => {
    if (completePaymentQuery.isError) {
      setIsErrorDialogOpen(true)
    }
  }, [completePaymentQuery.isError])

  const isPaymentSessionExpired = useMemo(() => {
    return !!(
      timeUntilPaymentSessionExpiry &&
      timeUntilPaymentSessionExpiry.asSeconds() <= 0
    )
  }, [timeUntilPaymentSessionExpiry])

  useEffect(() => {
    if (isPaymentSessionExpired) {
      setPaymentSessionInProgress(false)
      setIsPaymentSessionExpiryDialogOpen(true)
    }
  }, [isPaymentSessionExpired])

  return (
    <PageTemplate title="Cashier">
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        {/* Ticket code input */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <Box
            sx={{
              width: 1 / 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              label="Ticket code"
              sx={{ mb: 1 }}
              value={ticketCodeInput}
              onChange={e => setTicketCodeInput(e.target.value)}
              error={startPaymentQuery.isError}
              helperText={ticketCodeInputErrorMessage}
              disabled={paymentSessionInProgress}
            />

            <LoadingButton
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={startPayment}
              disabled={paymentSessionInProgress}
              loading={startPaymentQuery.isLoading}
            >
              Start Payment
            </LoadingButton>
          </Box>
        </Box>

        <Divider />

        {/* Visit info */}
        <Box sx={{ mt: 7, display: "flex", flexGrow: 1 }}>
          <Box
            sx={{
              mb: 4,
              pr: 7,
              borderRight: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              "& > *": { mb: 4 },
            }}
          >
            <div>
              <Typography variant="body1">Entry time:</Typography>
              <Typography variant="h5" color="secondary">
                {/*5:20 AM*/}
                {startPaymentQuery.data && paymentSessionInProgress
                  ? startPaymentQuery.data.visit.entryTime.format("h:mm A")
                  : "--"}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Time spent:</Typography>
              <Typography variant="h5" color="secondary">
                {/*5 hrs 32 min*/}
                {startPaymentQuery.data && paymentSessionInProgress
                  ? startPaymentQuery.data.visit.timeOfStay.format(
                      "H [hrs] m [min]"
                    )
                  : "--"}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Latest payment time:</Typography>
              <Typography variant="h5" color="secondary">
                {startPaymentQuery.data && paymentSessionInProgress
                  ? startPaymentQuery.data.visit.latestPaymentTime
                    ? startPaymentQuery.data.visit.latestPaymentTime.format(
                        "h:mm A"
                      )
                    : "N/A"
                  : "--"}
              </Typography>
            </div>
          </Box>

          <Divider orientation="vertical" />

          <Box sx={{ ml: 10 }}>
            <Typography variant="body1">Fee:</Typography>
            <Typography variant="h3" component="span" color="secondary">
              {startPaymentQuery.data && paymentSessionInProgress
                ? `Ksh ${startPaymentQuery.data.paymentSession.paymentAmount}`
                : "--"}
            </Typography>

            <Box sx={{ mt: 5, display: "flex" }}>
              <LoadingButton
                variant="contained"
                sx={{ mr: 4 }}
                disabled={!paymentSessionInProgress}
                onClick={() => {
                  if (startPaymentQuery.isSuccess && startPaymentQuery.data) {
                    completePaymentQuery.mutate(
                      startPaymentQuery.data.paymentSession.id
                    )
                  }
                }}
                loading={completePaymentQuery.isLoading}
              >
                Complete Payment
              </LoadingButton>
              <Button
                variant="outlined"
                disabled={
                  !paymentSessionInProgress || completePaymentQuery.isLoading
                }
                onClick={() => setPaymentSessionInProgress(false)}
              >
                Cancel Payment
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Time left until payment session expires:{" "}
              {timeUntilPaymentSessionExpiry && paymentSessionInProgress
                ? timeUntilPaymentSessionExpiry.format("m [min] s [sec]")
                : "-- min -- sec"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        onClose={() => {
          setIsSnackbarOpen(false)
        }}
      >
        <Alert
          severity="success"
          sx={{ width: 1 }}
          variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
        >
          Payment completed successfully
        </Alert>
      </Snackbar>

      <UnexpectedErrorDialog
        open={isErrorDialogOpen}
        onClose={handleCloseErrorDialog}
        close={handleCloseErrorDialog}
        error={completePaymentQuery.error}
      />

      <PaymentSessionExpiredDialog
        open={isPaymentSessionExpiryDialogOpen}
        onClose={() => setIsPaymentSessionExpiryDialogOpen(false)}
        startNewSession={async () => {
          await startPayment()
          setIsPaymentSessionExpiryDialogOpen(false)
        }}
      />
    </PageTemplate>
  )
}

function useTicketCodeInputError(
  isError: boolean,
  error: null | Error | ErrorResponse
) {
  return useMemo(() => {
    if (isError) {
      if (error instanceof ValidationErrorResponse) {
        return error.violations.ticketCode[0]
      } else if (error instanceof ErrorResponse) {
        return `${error.title}. ${error.detail}`
      } else if (error) {
        return `Unknown error experienced`
      }
    }
  }, [error, isError])
}

export default CashierPage
