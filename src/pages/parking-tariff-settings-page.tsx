import { useTable } from "react-table"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import MuiTable from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableRow from "@material-ui/core/TableRow"
import {TableCell} from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import { useMemo, useState } from "react"
import TimeRangeEditingCell from "../components/parking-tariff-settings/time-range-editting-cell"
import styles from "./parking-tariff-settings-page.module.css"
import ValidationWarningCell from "../components/parking-tariff-settings/validation-warning-cell";

type TariffEntry = {
  timeRange: {
    lowerLimit: number
    upperLimit: number
  }
  fee: number
  warnings: string[]
}

function ParkingTariffSettingsPage() {
  const [data, setData] = useState<TariffEntry[]>([
    {
      timeRange: { lowerLimit: 0, upperLimit: 10 },
      fee: 10.0,
      warnings: [],
    },
    {
      timeRange: { lowerLimit: 11, upperLimit: 20 },
      fee: 20.0,
      warnings: [],
    },
    {
      timeRange: { lowerLimit: 21, upperLimit: 30 },
      fee: 30.0,
      warnings: ["a"],
    },
  ])

  const columns = useMemo(
    () => [
      {
        accessor: "warnings",
        Header: "",
        Cell: ValidationWarningCell,
        width: "10%",
      },
      {
        Header: "Time Range (minutes)",
        accessor: "timeRange",
        Cell: TimeRangeEditingCell,
      },
      {
        Header: "Fee",
        accessor: "fee",
      },
    ],
    []
  )

  const updateAllData = (rowIndex: number, upperLimitValue: number) => {
    setData(old =>
      old.map((row, idx) => {
        if (idx === rowIndex) {
          old[idx + 1].timeRange.lowerLimit = Number(upperLimitValue) + 1

          return {
            ...row,
            timeRange: {
              ...row.timeRange,
              upperLimit: upperLimitValue,
            },
          }
        }

        return row
      })
    )
  }

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable(
      // @ts-ignore
      { columns, data, updateAllData }
    )

  return (
    <div className={styles.main}>
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

          <TableBody {...getTableBodyProps}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  <TableCell
                    {...row.cells[0].getCellProps()}
                    width={row.cells[0].column.width}
                    align="center"
                  >
                    {row.cells[0].render("Cell")}
                  </TableCell>
                  <TableCell
                    {...row.cells[1].getCellProps()}
                    width="30%"
                    align="center"
                  >
                    {row.cells[1].render("Cell")}
                  </TableCell>
                  <TableCell {...row.cells[2].getCellProps()}>
                    {row.cells[2].render("Cell")}
                  </TableCell>
                  {/*{row.cells.map(cell => (
                    <TableCell
                      // width={cell.column.id !== "fee" ? "30%" : "unset"}
                      align={cell.column.id !== "fee" ? "center" : "inherit"}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}*/}
                </TableRow>
              )
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  )
}

export default ParkingTariffSettingsPage
