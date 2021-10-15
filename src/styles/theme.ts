import { createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#6200ee" },
    secondary: { main: "#004d40" },
    background: {
      default: "#f2f2f2"
    }
  },
  typography: {
    button: {
      letterSpacing: 1.25,
      textTransform: "none"
    }
  }
})

export default theme