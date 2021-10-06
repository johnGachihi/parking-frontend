import {rest, RestHandler} from "msw"

const apiUrl = process.env.REACT_APP_BASE_API_URL

const handlers: RestHandler[] = [
  rest.get("http://localhost:8080/settings/parking-tariff", (
    req,
    res,
    ctx
  ) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          upperLimit: "PT10M",
          fee: 10.0
        },
        {
          upperLimit: "PT20M",
          fee: 20.0
        },
        {
          upperLimit: "PT30M",
          fee: 30.0
        },
        {
          upperLimit: "PT40M",
          fee: 40.0
        },
      ])
    )
  }),

  rest.put(
    `${apiUrl}/settings/parking-tariff`,
    (req, res, ctx) => res(ctx.status(200))
  )
]

export default handlers