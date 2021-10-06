import { useEffect, useRef, useState } from "react"
import styles from "./parking-tariff-settings-page.module.css"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import ParkingTariffSettingsTable from "../components/parking-tariff-settings/parking-tariff-settings-table"
import {
  useParkingRates,
  useUpdateParkingRates,
} from "../network/parking-tariff-settings"
import Duration from "../utils/Duration";

function ParkingTariffSettingsPage() {
  const { isSuccess, data: originalSettings } = useParkingRates()
  const {
    mutate,
    isSuccess: isSuccessfulUpdate,
    isError: isFailedUpdate,
    isLoading: isUpdating
  } = useUpdateParkingRates()

  const [settings, setSettings] = useState<ParkingRatesEntry[]>([])
  const snapshotSettingsSet = useRef(false)

  useEffect(() => {
    if (isSuccess && !snapshotSettingsSet.current) {
      setSettings(originalSettings!)
      snapshotSettingsSet.current = true
    }
  }, [isSuccess, originalSettings])

  const [isSettingsValid, setIsSettingsValid] = useState(true)

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
        {isSuccess && (
          <ParkingTariffSettingsTable
            settings={settings}
            setSettings={setSettings}
            setIsSettingsValid={setIsSettingsValid}
          />
        )}

        <Box mt={2} ml="auto">
          <Button
            disabled={!isSettingsValid}
            variant="contained"
            color="primary"
            onClick={() => mutate(settings)}
          >
            Save
          </Button>

          <span style={{ marginTop: "10px", display: "block" }}>
            {isSuccessfulUpdate && "Successfully saved"}
            {isFailedUpdate && "Save failed"}
            {isUpdating && "Loading..."}
          </span>
        </Box>
      </div>
    </div>
  )
}

export type ParkingRatesEntry = {
  upperLimit: Duration | null
  fee: number
}

export default ParkingTariffSettingsPage
