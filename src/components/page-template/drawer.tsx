import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import { styled } from "@mui/system"

const TextPlaceholder = styled("div")({
  height: "1rem",
  width: "100%",
  backgroundColor: "lightgray",
  marginBottom: "1rem",
})

function Drawer() {
  return (
    <MuiDrawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: "2rem",
          px: "1rem",
        }}
      >
        <TextPlaceholder />
        <TextPlaceholder />

        <Box mt="auto">
          <TextPlaceholder />
        </Box>
      </Box>
    </MuiDrawer>
  )
}

export default Drawer
