import PageTemplate from "../components/page-template/page-template"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import useStartPayment from "../network/start-payment"
import { useEffect, useMemo, useState } from "react"
import {
  ErrorResponse,
  ValidationErrorResponse,
} from "../network/error-response"
import LoadingButton from "../components/payment-page/loading-button"

function CashierPage() {
  const [ticketCodeInput, setTicketCodeInput] = useState<string>("")
  const [paymentSessionInProgress, setPaymentSessionInProgress] =
    useState(false)
  // TODO: collapse to startPayment|paymentStarter or the like
  const { mutate, isSuccess, data, isLoading, isError, error } =
    useStartPayment()
  const ticketCodeInputErrorMessage = useTicketCodeInputError(isError, error)

  useEffect(() => {
    if (isSuccess) setPaymentSessionInProgress(true)
  }, [isSuccess])

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
              error={isError}
              helperText={ticketCodeInputErrorMessage}
              disabled={paymentSessionInProgress}
            />

            <LoadingButton
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={() => mutate(ticketCodeInput)}
              disabled={paymentSessionInProgress}
              loading={isLoading}
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
              <Typography variant="body1">Entry Time:</Typography>
              <Typography variant="h5" color="secondary">
                {/*5:20 AM*/}
                --
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Time spent:</Typography>
              <Typography variant="h5" color="secondary">
                {/*5 hrs 32 min*/}
                {data && paymentSessionInProgress
                  ? `${data.visitTimeOfStay.hours()} hrs ${data.visitTimeOfStay.minutes()} min`
                  : "--"}
              </Typography>
            </div>
          </Box>

          <Divider orientation="vertical" />

          <Box sx={{ ml: 10 }}>
            <Typography variant="body1">Fee:</Typography>
            <Typography variant="h3" component="span" color="secondary">
              {data && paymentSessionInProgress
                ? `Ksh ${data.paymentSession.paymentAmount}`
                : "--"}
            </Typography>

            <Box sx={{ mt: 5, display: "flex" }}>
              <Button
                variant="contained"
                sx={{ mr: 4 }}
                disabled={!paymentSessionInProgress}
                onClick={() => setPaymentSessionInProgress(false)}
              >
                Complete Payment
              </Button>
              <Button
                variant="outlined"
                disabled={!paymentSessionInProgress}
                onClick={() => setPaymentSessionInProgress(false)}
              >
                Cancel Payment
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
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
