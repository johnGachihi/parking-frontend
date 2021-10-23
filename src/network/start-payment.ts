import client from "./client"
import { useMutation } from "react-query"
import { ErrorResponse } from "./error-response"
import axios, { AxiosError } from "axios"
import Duration from "../utils/Duration"
import DateTime from "../utils/DateTime"
import { useMemo } from "react"

type UnprocessedPaymentSession = {
  id: number
  paymentAmount: number
  expiryTime: string
}

type UnprocessedStartPaymentResult = {
  paymentSession: UnprocessedPaymentSession
  visitTimeOfStay: string
}

type PaymentSession = {
  id: number
  paymentAmount: number
  expiryTime: DateTime
}

type StartPaymentResult = {
  paymentSession: PaymentSession
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

  const processedData: StartPaymentResult | undefined = useMemo(
    () => (result.data ? processStartPaymentResult(result.data) : undefined),
    [result.data]
  )

  return { ...result, data: processedData }
}

function processStartPaymentResult(
  unprocessedResult: UnprocessedStartPaymentResult
): StartPaymentResult {
  const processedExpiryTime = DateTime.fromISOString(
    unprocessedResult.paymentSession.expiryTime
  )
  const processedVisitTimeOfStay = Duration.fromISO_8601String(
    unprocessedResult.visitTimeOfStay
  )

  return {
    ...unprocessedResult,
    paymentSession: {
      ...unprocessedResult.paymentSession,
      expiryTime: processedExpiryTime,
    },
    visitTimeOfStay: processedVisitTimeOfStay,
  }
}

export default useStartPayment
