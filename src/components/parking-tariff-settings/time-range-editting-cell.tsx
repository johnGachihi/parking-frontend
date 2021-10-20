import TextField from "@mui/material/TextField"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Row } from "react-table"
import { Typography } from "@mui/material"
import Duration from "../../utils/Duration"

type Props = {
  row: Row
  value: {
    lowerLimit: Duration | null
    upperLimit: Duration | null
  }
  updateData: (
    rowIndex: number,
    rowData: { upperLimit: Duration | null }
  ) => void
}

function TimeRangeEditingCell({
  value,
  row: { index: rowIndex },
  updateData,
}: Props) {
  const [upperLimit, setUpperLimit] = useState<string>(
    value.upperLimit?.asMinutes().toString() ?? ""
  )

  useEffect(() => {
    setUpperLimit(value.upperLimit?.asMinutes().toString() ?? "")
  }, [value])

  const handleUpperLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    setUpperLimit(input)
    const isNumeric = !isNaN(+input) && !isNaN(parseInt(input))
    if (isNumeric) {
      updateData(rowIndex, { upperLimit: Duration.ofMinutes(+input) })
    } else {
      updateData(rowIndex, { upperLimit: null })
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1">
        {value.lowerLimit ? value.lowerLimit.asMinutes() : "—"}
      </Typography>
      <span style={{ margin: "0 1em" }}>-</span>
      <TextField
        inputProps={{ type: "number", min: 1 }}
        sx={{
          width: 80,
          minWidth: 40,
        }}
        variant="standard"
        value={upperLimit}
        onChange={handleUpperLimitChange}
      />
    </div>
  )
}

export default TimeRangeEditingCell
