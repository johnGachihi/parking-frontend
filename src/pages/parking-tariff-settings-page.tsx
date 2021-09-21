import { useTable } from "react-table"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import MuiTable from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Button from "@material-ui/core/Button"
import TableBody from "@material-ui/core/TableBody"
import { useMemo, useState } from "react"
import TimeRangeEditingCell from "../components/parking-tariff-settings/time-range-editting-cell"
import styles from "./parking-tariff-settings-page.module.css"
import ValidationWarningCell from "../components/parking-tariff-settings/validation-warning-cell"
import FeeEditingCell from "../components/parking-tariff-settings/fee-editing-cell"
import ActionsCell from "../components/parking-tariff-settings/actions-cell"
import Box from "@material-ui/core/Box"
import Drawer from "@material-ui/core/Drawer"

function ParkingTariffSettingsPage() {
  const [data, setData] = useState<TariffEntry[]>([
    { upperLimit: 10, fee: 10.0 },
    { upperLimit: 20, fee: 20.0 },
    { upperLimit: 30, fee: 30.0 },
  ])

  const columns = useMemo<
    {
      id?: string
      accessor?: Function | string
      Cell?: any
      Header?: string
      width?: string
    }[]
  >(
    () => [
      {
        id: "warnings",
        accessor: (
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
        },
        Header: "",
        Cell: ValidationWarningCell,
        width: "10%",
      },
      {
        id: "timeRange",
        Header: "Time Range (minutes)",
        accessor: (
          row: TariffEntry,
          idx: number,
          sub: any,
          parentRows: any,
          data: TariffEntry[]
        ) => {
          return {
            lowerLimit: data[idx - 1]?.upperLimit ?? 0,
            upperLimit: row.upperLimit,
          }
        },
        Cell: TimeRangeEditingCell,
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
    ],
    []
  )

  const updateData = (rowIndex: number, newRowData: any) => {
    setData(old =>
      old.map((row, idx) => {
        if (idx === rowIndex) {
          return { ...row, ...newRowData }
        }

        return row
      })
    )
  }

  const addRow = (rowIndex: number, newRowData: TariffEntry) => {
    setData(old => [
      ...old.slice(0, rowIndex),
      newRowData,
      ...old.slice(rowIndex),
    ])
  }

  const removeRow = (rowIndex: number) => {
    setData(old => [...old.slice(0, rowIndex), ...old.slice(rowIndex + 1)])
  }

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data, updateData, addRow, removeRow })

  const isDataValid = useMemo<Boolean>(() => {
    return rows.every(row => row.values.warnings.length === 0)
  }, [rows])

  return (
    <div className={styles.root}>
      <Drawer
        variant="permanent"
        anchor="left"
        style={{
          width: "240px",
          flexShrink: 0,
        }}
        classes={{ paper: styles.drawerPaper }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.textPlaceholder}></div>
          <div className={styles.textPlaceholder}></div>

          <Box mt="auto">
            <div className={styles.textPlaceholder}></div>
          </Box>
        </div>
      </Drawer>

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
                    <TableCell {...row.cells[3].getCellProps()}>
                      {row.cells[3].render("Cell")}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <Box mt={2} ml="auto">
          <Button disabled={!isDataValid} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </div>
    </div>
  )
}

export type TariffEntry = {
  upperLimit: number
  fee: number
}

export default ParkingTariffSettingsPage
