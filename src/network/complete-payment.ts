import client from "./client"
import axios, { AxiosError } from "axios"
import {
  ErrorResponse,
  IllegalPaymentAttemptErrorResponse,
} from "./error-response"
import { useMutation } from "react-query"

async function makeHttpCompletePaymentRequest(paymentSessionId: number) {
  await client.put("/payment/complete-payment", { paymentSessionId })
}

function handleHttpError(e: AxiosError<any>) {
  if (e.response?.data?.type === "illegal-payment-attempt") {
    const { title, status, detail } = e.response.data
    throw new IllegalPaymentAttemptErrorResponse(title, status, detail)
  }

  throw e
}

async function completePayment(paymentSessionId: number) {
  try {
    await makeHttpCompletePaymentRequest(paymentSessionId)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      handleHttpError(e)
    }
    throw e
  }
}

function useCompletePayment() {
  return useMutation<unknown, null | Error | ErrorResponse, number>(
    paymentSessionId => completePayment(paymentSessionId)
  )
}

export default useCompletePayment
