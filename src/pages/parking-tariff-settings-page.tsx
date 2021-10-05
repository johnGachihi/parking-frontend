import { useState } from "react"
import styles from "./parking-tariff-settings-page.module.css"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import ParkingTariffSettingsTable from "../components/parking-tariff-settings/parking-tariff-settings-table";

function ParkingTariffSettingsPage() {
  const [data, setData] = useState<TariffEntry[]>([
    { upperLimit: 10, fee: 10.0 },
    { upperLimit: 20, fee: 20.0 },
    { upperLimit: 30, fee: 30.0 },
  ])

  const [, setIsSettingsValid] = useState(true)

  return (
    <div className={styles.root}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
        }}
        classes={{ paper: styles.drawerPaper }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.textPlaceholder}>{}</div>
          <div className={styles.textPlaceholder}>{}</div>

          <Box mt="auto">
            <div className={styles.textPlaceholder}>{}</div>
          </Box>
        </div>
      </Drawer>

      <div className={styles.main}>
        <ParkingTariffSettingsTable
          settings={data}
          setSettings={setData}
          setIsSettingsValid={setIsSettingsValid}
        />
      </div>
    </div>
  )
}

export type TariffEntry = {
  upperLimit: number
  fee: number
}

export default ParkingTariffSettingsPage
