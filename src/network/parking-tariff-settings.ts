import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "./client"
import { ParkingRatesEntry } from "../pages/parking-tariff-settings-page"
import Duration from "../utils/Duration"

type FetchedParkingRateEntry = {
  upperLimit: string
  fee: number
}

async function fetchParkingRates() {
  const fetchedData = await client.get<void, FetchedParkingRateEntry[]>(
    "settings/parking-tariff"
  )
  return transformFetchedParkingRates(fetchedData)
}

function transformFetchedParkingRates(
  fetchedParkingRates: FetchedParkingRateEntry[]
): ParkingRatesEntry[] {
  return fetchedParkingRates.map(entry => ({
    ...entry,
    upperLimit: new Duration(entry.upperLimit),
  }))
}

// TODO: Analyze the effect of cacheTime when
//       staleTime is Infinity (ie, if query
//       results never goes stale, do we need
//       the cache
function useParkingRates() {
  return useQuery<ParkingRatesEntry[], Error>(
    "parking-rates",
    fetchParkingRates,
    { staleTime: Infinity }
  )
}

async function putParkingRates(parkingRates: ParkingRatesEntry[]) {
  const transformedParkingRates: FetchedParkingRateEntry[] = parkingRates.map(
    entry => ({
      ...entry,
      upperLimit: entry.upperLimit!.toISOString(),
    })
  )

  await client.put<any, void>("/settings/parking-tariff", {
    newParkingTariffSettings: transformedParkingRates,
  })
}

function useUpdateParkingRates() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ParkingRatesEntry[], () => void>(
    async newRates => putParkingRates(newRates),
    {
      onMutate: (newRates: ParkingRatesEntry[]) => {
        const previousRates =
          queryClient.getQueryData<ParkingRatesEntry[]>("parking-rates")

        queryClient.setQueryData("parking-rates", newRates)

        return () => queryClient.setQueryData("parking-rates", previousRates)
      },
      onError: (error, variables, recover) => recover!(),
      onSettled: () => queryClient.invalidateQueries("parking-rates"),
    }
  )
}

export { useParkingRates, useUpdateParkingRates }
