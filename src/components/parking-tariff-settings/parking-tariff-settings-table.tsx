import React, {useEffect, useMemo} from "react";
import {TariffEntry} from "../../pages/parking-tariff-settings-page";
import ValidationWarningCell from "./validation-warning-cell";
import TimeRangeEditingCell from "./time-range-editting-cell";
import FeeEditingCell from "./fee-editing-cell";
import ActionsCell from "./actions-cell";
import {useTable} from "react-table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table"
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";


type Props = {
  settings: TariffEntry[]
  setSettings: React.Dispatch<React.SetStateAction<TariffEntry[]>>
  setIsSettingsValid: (isValid: boolean) => void
}

function ParkingTariffSettingsTable({ settings, setSettings, setIsSettingsValid }: Props) {
  const columns = useMemo<{
    id?: string
    accessor?: Function | string
    Cell?: any
    Header?: string
    width?: string
  }[]>(() => [
    {
      id: "warnings",
      accessor: warningsAccessor,
      Header: "",
      Cell: ValidationWarningCell,
      width: "10%",
    },
    {
      id: "timeRange",
      Header: "Time Range (minutes)",
      accessor: timeRangeAccessor,
      Cell: TimeRangeEditingCell,
      width: "30%"
    },
    {
      Header: "Fee",
      accessor: "fee",
      Cell: FeeEditingCell,
    },
    {
      id: "actions",
      Cell: ActionsCell,
    },
  ], [])

  const updateData = (rowIndex: number, newRowData: any) => {
    setSettings(old => old.map((row, idx) => {
      return idx === rowIndex
        ? { ...row, ...newRowData }
        : row
    }))
  }

  const addRow = (rowIndex: number, newRow: TariffEntry) => {
    setSettings(old => [
      ...old.slice(0, rowIndex),
      newRow,
      ...old.slice(rowIndex)
    ])
  }

  const removeRow = (rowIndex: number) => {
    setSettings(old => [...old.slice(0, rowIndex), ...old.slice(rowIndex + 1)])
  }

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data: settings, updateData, addRow, removeRow})

  useEffect(() => {
    const isSettingsValid = rows.every(row => row.values.warnings.length === 0)
    setIsSettingsValid(isSettingsValid)
  }, [rows, setIsSettingsValid])

  return (
    <TableContainer component={Paper}>
      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}


const warningsAccessor = (
  row: TariffEntry,
  idx: number,
  sub: any,
  parentRows: any,
  data: TariffEntry[]
) => {
  const warnings: string[] = []

  const lowerLimit = data[idx - 1]?.upperLimit ?? 0
  if (isNaN(row.upperLimit)) {
    warnings.push("Empty or invalid upper limit value provided")
  }

  if (lowerLimit >= data[idx].upperLimit) {
    warnings.push(
      "The lower limit is equal to or higher than the upper limit"
    )
  }

  if (isNaN(row.fee)) {
    warnings.push("A fee is required")
  }

  if (row.fee < 0) {
    warnings.push("The fee may only be equal to or greater than zero")
  }

  return warnings
}

const timeRangeAccessor = (
  row: TariffEntry,
  idx: number,
  sub: any,
  parentRows: any,
  data: TariffEntry[]
) => ({
  lowerLimit: data[idx - 1]?.upperLimit ?? 0,
  upperLimit: row.upperLimit,
})

export default ParkingTariffSettingsTable