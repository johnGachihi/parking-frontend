import { Row } from "react-table"
import TextField from "@material-ui/core/TextField"

type Props = {
  row: Row
  value: number
  updateData: Function
}

function FeeEditingCell({
  value,
  row: { index: rowIndex },
  updateData,
}: Props) {
  const handleChange = (e: any) => {
    updateData(rowIndex, { fee: e.target.value })
  }

  return (
    <TextField
      style={{
        width: "80px",
        minWidth: "40px",
      }}
      inputProps={{ type: "number" }}
      value={value}
      onChange={handleChange}
    />
  )
}

export default FeeEditingCell
