import React, { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../../redux/user/user.selectors"
import { updateCurrentUserAsync } from "../../../redux/user/user.actions"
import {
  fetchColumnsStartAsync,
  createColumnStartAsync,
  deleteColumnStartAsync,
} from "../../../redux/columns/columns.actions"
import { selectColumnsArray } from "../../../redux/columns/columns.selectors"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    variant: "outlined",
    width: "100%",
  },
  gridColumnContainer: {
    marginTop: "16px",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px !important",
  },
  gridFieldItem: {
    padding: "12px !important",
  },
  delete: {
    //color: "red",
  },
}))

const AddNewColumn = ({
  fetchColumnsStartAsync,
  createColumnStartAsync,
  columns,
}) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    order: Math.max(...columns.map(column => column.order)) + 1,
    name: "",
    displayName: "",
    type: "text",
    isEditable: true,
    isVisible: true,
  })

  useEffect(() => {
    console.log(state)
  })

  const handleChangeDisplayName = event => {
    let displayName = event.target.value
    let name = displayName
      .toLowerCase()
      .replace(" ", "")
      .replace(" ", "")
      .replace(" ", "")
      .replace(" ", "")
      .replace(" ", "")
    setState({ ...state, displayName, name })
  }

  const handleChangeType = event => {
    setState({ ...state, type: event.target.value })
  }

  const handleAdd = event => {
    console.log("Add action", state)
    createColumnStartAsync(state)
  }

  return (
    <Grid container spacing={4} className={classes.gridColumnContainer}>
      <Grid item xs={5} className={classes.gridFieldItem}>
        <FormControl className={classes.formControl}>
          <TextField
            id={"newColumn_displayName"}
            key={"newColumn_displayName"}
            name={"newColumn_displayName"}
            label={"New column name"}
            value={state.displayName}
            onChange={handleChangeDisplayName}
            autoComplete="new-password"
          />
        </FormControl>
      </Grid>
      <Grid item xs={5} className={classes.gridFieldItem}>
        <FormControl className={classes.formControl}>
          <InputLabel id={"newColumn_typeInputLabel"}>Type</InputLabel>
          <Select
            id={"newColumn_type"}
            name={"newColumn_type"}
            key={"newColumn_type"}
            value={state.type}
            onChange={event => handleChangeType(event)}
            autoWidth={false}
          >
            <MenuItem selected={true} key={"text"} value={"text"}>
              Text
            </MenuItem>
            <MenuItem key={"currency"} value={"currency"}>
              Currency
            </MenuItem>
            <MenuItem key={"date"} value={"date"}>
              Date
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2} className={classes.gridFieldItem}>
        <IconButton
          aria-label="delete"
          className={classes.delete}
          onClick={event => handleAdd(event)}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  columns: selectColumnsArray,
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUserAsync: currentUser =>
    dispatch(updateCurrentUserAsync(currentUser)),

  fetchColumnsStartAsync: () => dispatch(fetchColumnsStartAsync()),
  deleteColumnStartAsync: columnId =>
    dispatch(deleteColumnStartAsync(columnId)),
  createColumnStartAsync: column => dispatch(createColumnStartAsync(column)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewColumn)
