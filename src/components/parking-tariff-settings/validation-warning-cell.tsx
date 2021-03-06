import React, { PropsWithChildren, useState } from "react"
import IconButton from "@mui/material/IconButton"
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined"
import DoneIcon from "@mui/icons-material/Done"
import Badge from "@mui/material/Badge"
import Popover from "@mui/material/Popover"
import List from "@mui/material/List"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"

type Props = PropsWithChildren<{
  value: string[]
}>

function ValidationWarningCell({ value: warnings }: Props) {
  const [warningPopoverAnchorEl, setWarningPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  const isPopoverOpen = Boolean(warningPopoverAnchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWarningPopoverAnchorEl(e.currentTarget)
  }

  const handleWarningPopoverClose = () => setWarningPopoverAnchorEl(null)

  return warnings.length < 1 ? (
    <DoneIcon color="primary" />
  ) : (
    <>
      <Popover
        open={isPopoverOpen}
        onClose={handleWarningPopoverClose}
        anchorEl={warningPopoverAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List dense>
          {warnings.map((warning, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <ReportProblemOutlinedIcon color="error" />
              </ListItemIcon>
              <ListItemText>{warning}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Popover>

      <IconButton color="primary" size="small" onClick={handleClick}>
        <Badge
          badgeContent={warnings.length}
          color="error"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <ReportProblemOutlinedIcon />
        </Badge>
      </IconButton>
    </>
  )
}

export default ValidationWarningCell
