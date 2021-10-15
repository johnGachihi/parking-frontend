import React, { Suspense } from "react"
import { Switch, Route } from "react-router-dom"

const ParkingTariffSettingsPage = React.lazy(
  () => import("./pages/parking-tariff-settings-page")
)
const CashierPage = React.lazy(() => import("./pages/cashier-page"))

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Switch>
        <Route
          exact
          path="/settings/parking-rates"
          component={ParkingTariffSettingsPage}
        />
        <Route exact path="/cashier" component={CashierPage} />
      </Switch>
    </Suspense>
  )
}

export default App
