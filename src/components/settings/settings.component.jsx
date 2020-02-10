import React, { useEffect } from "react"

import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { updateCurrentUserAsync } from "../../redux/user/user.actions"
import {
  updateColumnStartAsync,
  deleteColumnStartAsync,
} from "../../redux/columns/columns.actions"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"

import "./settings.styles.scss"
import AddNewColumn from "./addNewColumn/addNewColumn.component.jsx"

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
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    variant: "outlined",
    width: "100%",
  },
  fieldsContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "8px 0",
  },
  fieldItem: {},
  displayNameTextField: {},
  typeSelect: {},
  delete: {
    //color: "red",
  },
  dialog: {},
  title: {
    margin: 0,
    paddingLeft: "26px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

const Settings = ({
  isOpen,
  closeModal,
  columns,
  updateCurrentUserAsync,
  currentUser,
  updateColumnStartAsync,
  deleteColumnStartAsync,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))
  //console.log(fullScreen ? "fullscreen-mode" : "mobile-mode")

  const [state, setState] = React.useState(columns ? [...columns] : null)

  useEffect(() => {
    // console.log("columns prop changed")
    setState(columns ? [...columns] : null)
  }, [columns])

  // Close
  const handleClose = () => {
    closeModal()
  }

  const reset = () => {
    console.log("reset")
    setState(columns ? [...columns] : null) // reset all inputs (for fresh next opening)
  }

  // Save
  const handleSave = () => {
    state.forEach((column, index) => {
      if (column.hasChanged) {
        delete column.hasChanged
        console.log(column)
        updateColumnStartAsync(column)
      }
    })
    handleClose()
  }

  const handleChangeDisplayName = (event, index) => {
    let newColumns = [...state]
    newColumns[index].displayName = event.target.value
    newColumns[index].hasChanged = true
    setState([...newColumns])
  }

  const handleChangeType = (event, index) => {
    let newColumns = [...state]
    newColumns[index].type = event.target.value
    newColumns[index].hasChanged = true
    setState([...newColumns])
  }

  const handleChangeDelete = (event, index) => {
    console.log(state)
    let columnId = state[index].id
    console.log("Deleting column with ID = ", columnId)
    const confirmed = window.confirm(
      "Are you sure to delete column " +
        state[index].displayName +
        " and all its associated entry-data?",
    )
    if (confirmed) deleteColumnStartAsync(columnId).then(() => reset())
  }

  const fields = () => {
    if (columns) {
      let jsx = columns.map((column, index) =>
        column.isEditable ? (
          <Grid container spacing={3} className={classes.fieldsContainer}>
            <Grid item xs={6} className={classes.fieldItem}>
              <FormControl className={classes.formControl}>
                <TextField
                  id={column.name + "_displayName"}
                  key={column.name + "_displayName"}
                  name={"columnDisplayName"}
                  className={classes.displayNameTextField}
                  label={"Column"}
                  value={state && state[index] ? state[index].displayName : ""}
                  onChange={event => handleChangeDisplayName(event, index)}
                  autoComplete="new-password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.fieldItem}>
              <FormControl className={classes.formControl}>
                <Select
                  id={column.name + "_type"}
                  name={"columnType"}
                  key={column.name}
                  value={state && state[index] ? state[index].type : null}
                  onChange={event => handleChangeType(event, index)}
                  autoWidth={false}
                  className={classes.typeSelect}
                  disabled
                >
                  <MenuItem key={"currency"} value={"currency"}>
                    Currency
                  </MenuItem>
                  <MenuItem key={"date"} value={"date"}>
                    Date
                  </MenuItem>
                  <MenuItem key={"text"} value={"text"}>
                    Text
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} className={classes.fieldItem}>
              <IconButton
                aria-label="delete"
                className={classes.delete}
                onClick={event => handleChangeDelete(event, index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : null,
      )
      return jsx
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      //onEnter={reset}
      className={classes.dialog}
      maxWidth={false}
    >
      <MuiDialogTitle
        id="modal-title"
        disableTypography
        className={classes.title}
      >
        <Typography variant="h6">Settings</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent
        style={{
          overflowY: "hidden",
          marginBottom: "12px",
        }}
      >
        {fields()}
        <AddNewColumn />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  columns: selectColumnsArray,
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUserAsync: currentUser =>
    dispatch(updateCurrentUserAsync(currentUser)),
  updateColumnStartAsync: column => dispatch(updateColumnStartAsync(column)),
  deleteColumnStartAsync: columnId =>
    dispatch(deleteColumnStartAsync(columnId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
