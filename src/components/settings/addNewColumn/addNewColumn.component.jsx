import React, { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../../redux/user/user.selectors"
import { updateCurrentUserAsync } from "../../../redux/user/user.actions"
import { deleteColumnStartAsync } from "../../../redux/columns/columns.actions"
import { selectColumnsArray } from "../../../redux/columns/columns.selectors"

import { useTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"

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
}))

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingLeft: "26px",
  },
})

const AddNewColumn = ({}) => {
  const theme = useTheme()
  const classes = useStyles()

  const [state, setState] = React.useState({
    order: null,
    name: "",
    displayName: "",
    type: "",
    isEditable: true,
  })

  useEffect(() => {
    console.log(state)
  })

  // Save
  const handleSave = () => {}

  const handleChangeDisplayName = event => {
    setState({ displayName: event.target.value })
  }

  const handleChangeType = event => {
    setState({ type: event.target.value })
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
            onChange={handleChangeType}
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
            onChange={handleChangeType}
            autoWidth={false}
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
  deleteColumnStartAsync: columnId =>
    dispatch(deleteColumnStartAsync(columnId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewColumn)
