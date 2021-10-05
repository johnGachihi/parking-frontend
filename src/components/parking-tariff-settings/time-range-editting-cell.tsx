import TextField from "@mui/material/TextField"
import React, {ChangeEvent} from "react"
import { Row } from "react-table"
import { Typography } from "@mui/material"

type Props = {
  row: Row
  value: {
    lowerLimit: number
    upperLimit: number
  }
  updateData: (
    rowIndex: number,
    rowData: { fee?: number; upperLimit: number | null }
  ) => void
}

function TimeRangeEditingCell({
  value,
  row: { index: rowIndex },
  updateData,
}: Props) {
  const handleUpperLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData(rowIndex, { upperLimit: parseInt(e.target.value) })
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1">{isNaN(value.lowerLimit) ? "—" : value.lowerLimit}</Typography>
      <span style={{ margin: "0 1em" }}>-</span>
      <TextField
        inputProps={{ type: "number", min: 1 }}
        sx={{
          width: 80,
          minWidth: 40
        }}
        variant="standard"
        value={value.upperLimit}
        onChange={handleUpperLimitChange}
      />
    </div>
  )
}

export default TimeRangeEditingCell
