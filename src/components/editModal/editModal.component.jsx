import React from "react"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
} from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectEntriesMap } from "../../redux/entries/entries.selectors"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"
import "./editModal.styles.scss"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"

import CurrencyFormat from "react-currency-format"
import {
  getThousandSeparatorFromCurreny,
  getDecimalSeparatorFromCurrency,
  getPrefixFromCurrency,
  getSuffixFromCurrency,
} from "./editModal.utils.js"

import DateFnsUtils from "@date-io/date-fns" // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
//import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import { formatIntervalToString } from "../tableEntries/tableEntries.utils"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    //minWidth: 120,
    size: "medium",
    variant: "outlined",
    width: "90%",
  },
}))

const EditEntryModal = ({
  isOpen,
  closeModal,
  selectedEntryId,
  currentUser,
  entries,
  columns,
  updateEntryStartAsync,
}) => {
  const theme = useTheme()
  const classes = useStyles()

  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

  // Create current entry object
  // (new if empty entry prop, from store if prop available)
  const columnNames = columns.reduce((o, key) => ({ ...o, [key.name]: "" }), {})

  // Leere Felder ergänzen (optional?)
  //entry = { ...columnNames, ...entry }

  const [currentEntry, setCurrentEntry] = React.useState()

  const loadEntry = () => {
    selectedEntryId
      ? setCurrentEntry(entries[selectedEntryId])
      : setCurrentEntry(columnNames)
  }

  const handleClose = () => {
    closeModal()
  }

  const handleChangeText = event => {
    console.log("text changed ", event.target.id, event.target.value)
    setCurrentEntry({
      ...currentEntry,
      [event.target.id]: event.target.value,
    })
  }

  const handleChangeCurrency = (values, propertyName) => {
    console.log("currency value changed ", propertyName, values)
    setCurrentEntry({
      ...currentEntry,
      [propertyName]: values.floatValue,
    })
  }

  const handleChangeDate = (date, propertyName) => {
    console.log("date value changed ", date, propertyName)
    setCurrentEntry({
      ...currentEntry,
      [propertyName]: date,
    })
  }

  const handleChangeSelect = event => {
    console.log("select value changed ", event)
    setCurrentEntry({
      ...currentEntry,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    //convertAllDatesToFirebaseDateFormat();
    updateEntryStartAsync(currentEntry)
    handleClose()
  }

  const field = column => {
    switch (column.type) {
      case "text":
        //console.log(currentEntry[column.name])
        return (
          <TextField
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={
              currentEntry && currentEntry[column.name]
                ? currentEntry[column.name]
                : "xxx"
            }
            onChange={handleChangeText}
            type="text"
            autoFocus
            fullWidth
          />
        )

      case "currency":
        //console.log(currentEntry[column.name])
        return (
          <CurrencyFormat
            customInput={props => <TextField {...props} />}
            thousandSeparator={getThousandSeparatorFromCurreny(
              currentUser.currency,
            )}
            decimalSeparator={getDecimalSeparatorFromCurrency(
              currentUser.currency,
            )}
            allowNegative={false}
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={
              currentEntry && currentEntry[column.name]
                ? currentEntry[column.name]
                : 0
            }
            onValueChange={values => handleChangeCurrency(values, column.name)}
            prefix={getPrefixFromCurrency(currentUser.currency)}
            suffix={getSuffixFromCurrency(currentUser.currency)}
            autoFocus
            fullWidth
          />
        )

      case "date":
        return (
          <KeyboardDatePicker
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={
              currentEntry && currentEntry[column.name]
                ? currentEntry[column.name]
                : null
            }
            onChange={date => handleChangeDate(date, column.name)}
            format="dd.MM.yyyy"
            openTo="year"
            views={["year", "month", "date"]}
            clearable
            autoOk
          />
        )

      case "interval":
        //if (currentEntry) console.log(currentEntry[column.name])
        console.log(column)
        return (
          <>
            <InputLabel id="interval-label">{column.displayName}</InputLabel>
            <Select
              labelId="interval-label"
              id={column.name}
              name={column.name}
              key={column.name}
              value={
                currentEntry && currentEntry[column.name]
                  ? currentEntry[column.name]
                  : ""
              }
              onChange={handleChangeSelect}
            >
              {column.values.map(selectValue => (
                <MenuItem key={selectValue} value={selectValue}>
                  {formatIntervalToString(selectValue)}
                </MenuItem>
              ))}
            </Select>
          </>
        )

      case "direction":
        //if (currentEntry) console.log(currentEntry[column.name])
        console.log(column)
        return (
          <>
            <InputLabel id="direction-label">{column.displayName}</InputLabel>
            <Select
              labelId="direction-label"
              id={column.name}
              name={column.name}
              key={column.name}
              value={
                currentEntry && currentEntry[column.name]
                  ? currentEntry[column.name]
                  : ""
              }
              onChange={handleChangeSelect}
            >
              {column.values.map(selectValue => (
                <MenuItem value={selectValue}>{selectValue}</MenuItem>
              ))}
            </Select>
          </>
        )

      case "select":
        //if (currentEntry) console.log(currentEntry[column.name])
        console.log(column)
        return (
          <>
            <InputLabel id="select-label">{column.displayName}</InputLabel>
            <Select
              labelId="select-label"
              id={column.name}
              name={column.name}
              key={column.name}
              value={
                currentEntry && currentEntry[column.name]
                  ? currentEntry[column.name]
                  : ""
              }
              onChange={handleChangeSelect}
            >
              {column.values.map(selectValue => (
                <MenuItem key={selectValue} value={selectValue}>
                  {selectValue}
                </MenuItem>
              ))}
            </Select>
          </>
        )

      default:
        return <>Undefined type</>
    }
  }

  const fields = columns.map(column => (
    <Grid
      key={column.order}
      item
      xs={column.order < 4 ? 6 : 12}
      className={classes.gridItem}
    >
      <FormControl className={classes.formControl}>{field(column)}</FormControl>
    </Grid>
  ))

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        onEnter={loadEntry}
        aria-labelledby="Add "
      >
        {selectedEntryId ? (
          <DialogTitle id="modal-title">{"Edit entry"}</DialogTitle>
        ) : (
          <DialogTitle id="modal-title">{"New entry"}</DialogTitle>
        )}
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
              {fields}
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>

          {selectedEntryId ? (
            <>
              <Button autoFocus onClick={handleClose} color="secondary">
                Delete
              </Button>
              <Button onClick={handleSave} color="primary" autoFocus>
                Save
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} color="primary" autoFocus>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  entries: selectEntriesMap,
  columns: selectColumnsArray,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
  createEntryStartAsync: entryToCreate =>
    dispatch(createEntryStartAsync(entryToCreate)),
  updateEntryStartAsync: entryToUpdate =>
    dispatch(updateEntryStartAsync(entryToUpdate)),
  deleteEntryStartAsync: entryToDelete =>
    dispatch(deleteEntryStartAsync(entryToDelete)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryModal)
