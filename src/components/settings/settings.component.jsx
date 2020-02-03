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
    margin: 0,
    variant: "outlined",
    width: "100%",
  },
  gridColumnContainer: {},
  gridColumnItem: {},

  gridFieldContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridFieldItem: {},
  displayNameTextField: {},
  typeSelect: {},
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
            className={classes.gridColumnItem}
          >
            <Grid container spacing={3} className={classes.gridFieldContainer}>
              <Grid item xs={5} className={classes.gridFieldItem}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id={column.name + "_displayName"}
                    key={column.name + "_displayName"}
                    name={"columnDisplayName"}
                    className={classes.displayNameTextField}
                    label={"Display name"}
                    value={column.displayName}
                    onChange={() => null}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={5} className={classes.gridFieldItem}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="column.name + " _typeInputLabel>
                    Type
                  </InputLabel>
                  <Select
                    id={column.name + "_type"}
                    name={"columnType"}
                    key={column.name}
                    value={column.type}
                    onChange={() => null}
                    autoWidth={false}
                    className={classes.typeSelect}
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
              <Grid item xs={2}>
                <IconButton aria-label="delete" className={classes.delete}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
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
          <Grid container spacing={4} className={classes.gridColumnContainer}>
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
