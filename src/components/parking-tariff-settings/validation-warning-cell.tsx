import React, { PropsWithChildren, useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined"
import Badge from "@material-ui/core/Badge"
import Popover from "@material-ui/core/Popover"
import List from "@material-ui/core/List"
import {ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core"

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

  const handleWarningPopoverClose = () => {
    setWarningPopoverAnchorEl(null)
  }

  return warnings.length < 1 ? null : (
    <>
      <Popover
        open={isPopoverOpen}
        onClose={handleWarningPopoverClose}
        anchorEl={warningPopoverAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <List dense>
          <ListItem>
            <ListItemIcon>
              <ReportProblemOutlinedIcon color="error" />
            </ListItemIcon>
            <ListItemText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Ble</ListItemText>
          </ListItem>
        </List>
      </Popover>
      <IconButton color="primary" onClick={handleClick}>
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
