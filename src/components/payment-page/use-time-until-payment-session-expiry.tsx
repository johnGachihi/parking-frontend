import DateTime from "../../utils/DateTime"
import Duration from "../../utils/Duration"
import { useEffect, useState } from "react"

function useTimeUntilPaymentSessionExpiry(
  expiryTime: DateTime | undefined,
  update: boolean,
  updateAfterSeconds: number
) {
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<Duration>()

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (expiryTime && update) {
      setTimeUntilExpiry(expiryTime.fromNow())
      intervalId = setInterval(
        () => setTimeUntilExpiry(expiryTime.fromNow()),
        updateAfterSeconds * 1000
      )
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [expiryTime, update, updateAfterSeconds])

  return timeUntilExpiry
}

export { useTimeUntilPaymentSessionExpiry }
