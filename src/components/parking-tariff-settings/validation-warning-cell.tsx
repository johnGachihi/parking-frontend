import React, { PropsWithChildren, useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined"
import DoneIcon from "@material-ui/icons/Done"
import Badge from "@material-ui/core/Badge"
import Popover from "@material-ui/core/Popover"
import List from "@material-ui/core/List"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"

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
