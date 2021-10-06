import MoreVertIcon from "@mui/icons-material/MoreVert"
import IconButton from "@mui/material/IconButton"
import React, { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Row } from "react-table"
import { ParkingRatesEntry } from "../../pages/parking-tariff-settings-page"

type Props = {
  row: Row<ParkingRatesEntry>
  addRow: (rowIndex: number, entry: ParkingRatesEntry) => void
  removeRow: Function
}

function ActionsCell({ row, addRow, removeRow: _removeRow }: Props) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget)
  }
  const handleMenuClose = () => setMenuAnchorEl(null)
  const closeMenu = () => setMenuAnchorEl(null)
  const isMenuOpen = Boolean(menuAnchorEl)

  const addRowAbove = () => {
    closeMenu()

    const currentRowLowerLimit = row.values.timeRange.lowerLimit
    addRow(row.index, {
      upperLimit: currentRowLowerLimit.addMinutes(1),
      fee: 0,
    })
  }

  const addRowBelow = () => {
    closeMenu()

    const currentRowUpperLimit = row.values.timeRange.upperLimit
    addRow(row.index + 1, {
      upperLimit: currentRowUpperLimit.addMinutes(1),
      fee: 0,
    })
  }

  const removeRow = () => {
    closeMenu()
    _removeRow(row.index)
  }
  return (
    <>
      <IconButton
        size="small"
        aria-controls="row-actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="row-actions-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={addRowAbove}>Add row above</MenuItem>
        <MenuItem onClick={addRowBelow}>Add row below</MenuItem>
        <MenuItem onClick={removeRow}>Delete row</MenuItem>
      </Menu>
    </>
  )
}

export default ActionsCell
