import TextField from "@material-ui/core/TextField"
import React, {ChangeEvent} from "react"
import styles from "./time-range-editting-cell.module.css"
import { Row } from "react-table"
import { Typography } from "@material-ui/core"

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
        InputProps={{
          classes: { root: styles.input },
        }}
        inputProps={{ type: "number", min: 1 }}
        style={{
          fontSize: "14px",
          background: "transparent",
          display: "inline",
          width: "80px",
          minWidth: "40px",
        }}
        value={value.upperLimit}
        onChange={handleUpperLimitChange}
      />
    </div>
  )
}

export default TimeRangeEditingCell
