import {rest} from "msw"

const handlers = [
  rest.get("http://localhost:8080/settings/parking-tariff", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          upperLimit: 10,
          fee: 10.0
        },
        {
          upperLimit: 20,
          fee: 20.0
        },
        {
          upperLimit: 30,
          fee: 30.0
        },
        {
          upperLimit: 40,
          fee: 40.0
        },
      ])
    )
  })
]

export default handlers