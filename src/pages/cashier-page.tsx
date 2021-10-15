import PageTemplate from "../components/page-template/page-template"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

function CashierPage() {
  return (
    <PageTemplate title="Cashier">
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        {/* Ticket code input */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <Box
            sx={{
              width: 1 / 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              label="Ticket code"
              sx={{ mb: 1 }}
            />
            <Button variant="contained" sx={{ width: "fit-content" }}>
              Start Payment
            </Button>
          </Box>
        </Box>

        <Divider />

        {/* Visit info */}
        <Box sx={{ mt: 7, display: "flex", flexGrow: 1 }}>
          <Box
            sx={{
              mb: 4,
              pr: 7,
              borderRight: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              "& > *": { mb: 4 },
            }}
          >
            <div>
              <Typography variant="body1">Entry Time:</Typography>
              <Typography variant="h5" color="secondary">
                5:20 AM
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Time spent:</Typography>
              <Typography variant="h5" color="secondary">
                5 hrs 32 min
              </Typography>
            </div>
          </Box>

          <Divider orientation="vertical" />

          <Box sx={{ ml: 10 }}>
            <Typography variant="body1">Fee:</Typography>
            <Typography variant="h3" component="span" color="secondary">
              Ksh 1,000.0
            </Typography>

            <Box sx={{ mt: 5, display: "flex" }}>
              <Button variant="contained" sx={{ mr: 4 }}>
                Complete Payment
              </Button>
              <Button variant="outlined">Cancel Payment</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageTemplate>
  )
}

export default CashierPage
