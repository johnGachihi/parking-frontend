import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import styles from "./time-range-editting-cell.module.css"
import { Row } from "react-table"
import {Typography} from "@material-ui/core";

type Props = {
  row: Row
  value: {
    lowerLimit: number
    upperLimit: number
  }
  updateAllData: Function
}

function TimeRangeEditingCell({
  value: valueFromOut,
  row: { index },
  updateAllData,
}: Props) {
  const [innerValue, setInnerValue] = useState(valueFromOut)

  const handleUpperLimitChange = (e: any) => {
    updateAllData(index, e.target.value)
  }

  useEffect(() => {
    setInnerValue(valueFromOut)
  }, [valueFromOut])

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1">{innerValue.lowerLimit}</Typography>
      <span style={{ margin: "0 1em" }}>-</span>
      <TextField
        InputProps={{
          classes: { root: styles.input },
        }}
        inputProps={{ type: "number" }}
        style={{
          fontSize: "14px",
          background: "transparent",
          display: "inline",
          width: "80px",
          minWidth: "40px",
        }}
        value={innerValue.upperLimit}
        onChange={handleUpperLimitChange}
      />
    </div>
  )
}

export default TimeRangeEditingCell
