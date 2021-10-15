import Drawer from "./drawer"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{ title?: string }>

function PageTemplate({ children, title }: Props) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer />
      <Box sx={{ p: 3, width: 1 }}>
        {title && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">{title}</Typography>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  )
}

export default PageTemplate
