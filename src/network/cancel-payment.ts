import client from "./client"
import axios, { AxiosError } from "axios"
import { ErrorResponse } from "./error-response"
import { useMutation } from "react-query"

async function makeCancelPaymentHttpRequest(paymentSessionId: number) {
  await client.put("/payment/cancel-payment", { paymentSessionId })
}

function handleHttpError(e: AxiosError<any>) {
  if (e.response?.data?.type === "illegal-payment-cancellation-attempt") {
    const { title, status, detail } = e.response.data
    throw new ErrorResponse(title, status, detail)
  }

  throw e
}

async function cancelPayment(paymentSessionId: number) {
  try {
    await makeCancelPaymentHttpRequest(paymentSessionId)
  } catch (e) {
    if (axios.isAxiosError(e)) handleHttpError(e)
    else throw e
  }
}

function useCancelPayment() {
  return useMutation<unknown, null | Error | ErrorResponse, number>(
    paymentSessionId => cancelPayment(paymentSessionId)
  )
}

export default useCancelPayment
