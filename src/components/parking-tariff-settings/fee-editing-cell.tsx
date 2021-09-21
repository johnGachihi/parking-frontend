import { Row } from "react-table"
import TextField from "@material-ui/core/TextField"
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
      style={{
        width: "80px",
        minWidth: "40px",
      }}
      inputProps={{ type: "number", min: 0 }}
      value={value}
      onChange={handleChange}
    />
  )
}

export default FeeEditingCell
