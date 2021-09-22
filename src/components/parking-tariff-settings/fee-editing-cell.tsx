import { Row } from "react-table"
import TextField from "@mui/material/TextField"
import { ChangeEvent } from "react"

type Props = {
  row: Row
  value: number
  updateData: (rowIndex: number, rowData: { fee: number }) => void
}

function FeeEditingCell({
  value,
  row: { index: rowIndex },
  updateData,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData(rowIndex, { fee: parseInt(e.target.value) })
  }

  return (
    <TextField
      sx={{
        width: 80,
        minWidth: 40
      }}
      variant="standard"
      inputProps={{ type: "number", min: 0 }}
      value={value}
      onChange={handleChange}
    />
  )
}

export default FeeEditingCell
