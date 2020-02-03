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
//import TextField from "@material-ui/core/TextField"
//import Autocomplete from "@material-ui/lab/Autocomplete"
//import InputLabel from "@material-ui/core/InputLabel"
//import MenuItem from "@material-ui/core/MenuItem"
//import Select from "@material-ui/core/Select"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    //minWidth: 120,
    size: "medium",
    variant: "outlined",
    width: "90%",
  },
  gridItem: {
    padding: "0 !important",
  },
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

  const fields = columns
    ? columns.map(column => (
        <Grid
          key={column.order}
          item
          xs={column.order < 4 ? 6 : 12}
          className={classes.gridItem}
        >
          <FormControl className={classes.formControl}>{column.id}</FormControl>
        </Grid>
      ))
    : null

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
        <DialogTitle id="modal-title" onClose={handleClose}>
          {"Edit entry"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {fields}
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
