import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import theme from "./styles/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { QueryClientProvider, QueryClient } from "react-query"

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/msw/browser")
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
