import client from "./client"
import { useMutation } from "react-query"
import { ErrorResponse } from "./error-response"
import axios, { AxiosError } from "axios"
import Duration from "../utils/Duration"

type UnprocessedPaymentSession = {
  id: number
  paymentAmount: number
  paymentSessionExpiryTime: string
}

type UnprocessedStartPaymentResult = {
  paymentSession: UnprocessedPaymentSession
  visitTimeOfStay: string
}

type StartPaymentResult = {
  paymentSession: UnprocessedPaymentSession
  visitTimeOfStay: Duration
}

async function makeStartPaymentRequest(ticketCode: string) {
  return await client.put<
    { ticketCode: string },
    UnprocessedStartPaymentResult
  >("/payment/start-payment", { ticketCode })
}

function handleAxiosError(e: AxiosError<any>) {
  if (e.response?.data) {
    const errorData = e.response.data
    if (
      errorData?.type === "illegal-payment-attempt" ||
      errorData?.type === "invalid-ticket-code"
    ) {
      throw new ErrorResponse(
        errorData.title,
        errorData.status,
        errorData.detail
      )
    }
  }

  throw e
}

async function startPayment(ticketCode: string) {
  try {
    return await makeStartPaymentRequest(ticketCode)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      handleAxiosError(e)
    }
    throw e
  }
}

function useStartPayment() {
  const result = useMutation<
    UnprocessedStartPaymentResult,
    Error | ErrorResponse,
    string
  >(ticketCode => startPayment(ticketCode))

  const processedData: StartPaymentResult | undefined = result.data
    ? {
        ...result.data,
        visitTimeOfStay: new Duration(result.data.visitTimeOfStay),
      }
    : undefined

  return { ...result, data: processedData }
}

export default useStartPayment
