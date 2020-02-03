import React from "react"
import "./settings.styles.scss"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { updateCurrentUserAsync } from "../../redux/user/user.actions"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"

import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import DeleteIcon from "@material-ui/icons/Delete"

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    variant: "outlined",
    width: "130px",
  },
  grid: {
    flexGrow: 1,
  },
  gridItemColumn: {
    padding: "0 !important",
  },
  gridContainerFields: {
    flexGrow: 1,
  },
  gridItemField: {},
}))

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingLeft: "26px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const Settings = ({
  isOpen,
  closeModal,
  columns,
  updateCurrentUserAsync,
  currentUser,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

  // Close
  const handleClose = () => {
    closeModal()
  }

  // Save
  const handleSave = () => {
    handleClose()
  }

  const fields = () => {
    if (columns) {
      let editableColumns = columns.filter(column => column.isEditable)
      let jsx = editableColumns.map(column => {
        return (
          // Column entry
          <Grid
            item
            key={column.order}
            xs={12}
            className={classes.gridItemColumn}
          >
            <Grid container className={classes.gridContainerFields}>
              <Grid item className={classes.gridItemField}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id={column.name + "_displayName"}
                    key={column.name + "_displayName"}
                    name={"columnDisplayName"}
                    label={"Display name"}
                    value={column.displayName}
                    onChange={() => null}
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItemField}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id={column.name + "_name"}
                    key={column.name + "_name"}
                    name={"columnName"}
                    label={"Internal name"}
                    value={column.name}
                    disabled
                    onChange={() => null}
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItemField}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-type">Type</InputLabel>
                  <Select
                    id={column.name + "_type"}
                    name={"columnType"}
                    key={column.name}
                    value={column.type}
                    onChange={() => null}
                  >
                    <MenuItem key={"currency"} value={"currency"}>
                      currency
                    </MenuItem>
                    <MenuItem key={"date"} value={"date"}>
                      date
                    </MenuItem>
                    <MenuItem key={"text"} value={"text"}>
                      text
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <IconButton aria-label="delete" className={classes.delete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        )
      })
      return jsx
    }
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
        <DialogTitle id="modal-title" onClose={handleClose}>
          {"Settings"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {fields()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  columns: selectColumnsArray,
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUserAsync: currentUser =>
    dispatch(updateCurrentUserAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
