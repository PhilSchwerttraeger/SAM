import React, { useEffect } from "react"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
} from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import {
  selectEntriesMap,
  selectEntriesArray,
} from "../../redux/entries/entries.selectors"
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
import Autocomplete from "@material-ui/lab/Autocomplete"
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
  gridItem: {
    padding: "0 !important",
  },
}))

const EditEntryModal = ({
  isOpen,
  closeModal,
  selectedEntryId,
  currentUser,
  entries,
  entriesArray,
  columns,
  updateEntryStartAsync,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

  // Leere Felder ergänzen (optional?)
  //entry = { ...columnNames, ...entry }

  // Create current entry object
  // (new if empty entry prop, from store if prop available)
  const columnNames = columns
    ? columns.reduce((o, key) => ({ ...o, [key.name]: "" }), {})
    : null

  const [currentEntry, setCurrentEntry] = React.useState(columnNames)

  useEffect(() => {
    setCurrentEntry(entries ? entries[selectedEntryId] : null)
    /* 
    console.log("selectedEntryId ", selectedEntryId)
    console.log("currentEntry ", currentEntry)
    console.log("entries[selectedEntryId] ", entries[selectedEntryId])
    */
  }, [entries, selectedEntryId])

  const handleClose = () => {
    closeModal()
  }

  // Text
  const handleChangeText = (columnName, event, value) => {
    console.log("text changed ", columnName, event, value)

    if (event !== null) {
      console.log("triggered")
      setCurrentEntry({
        ...currentEntry,
        [columnName]: value,
      })
    }
  }

  // Currency
  const handleChangeCurrency = (values, propertyName) => {
    console.log("currency value changed ", propertyName, values)
    setCurrentEntry({
      ...currentEntry,
      [propertyName]: values.floatValue,
    })
  }

  // Date
  const handleChangeDate = (date, propertyName) => {
    console.log("date value changed ", date, propertyName)
    setCurrentEntry({
      ...currentEntry,
      [propertyName]: date,
    })
  }

  // Select
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

  const makeOptions = column => {
    // make array of all values
    let array = entriesArray.map(entry => entry[column.name])

    // create set (delete duplicates)
    let set = [...new Set(array)]

    // cleanup: remove undefined
    let sanitizedSet = set.filter(item => item !== undefined)

    // generate and return object with expected structure for autocomplete component to handle
    return sanitizedSet.map(entry => {
      return {
        title: entry ? entry : "",
      }
    })
  }

  const field = column => {
    switch (column.type) {
      case "text":
        return (
          <Autocomplete
            freeSolo
            id={column.name}
            key={column.name}
            options={makeOptions(column)}
            getOptionLabel={option => (option.title ? option.title : "")}
            inputValue={
              currentEntry && currentEntry[column.name]
                ? currentEntry[column.name]
                : ""
            }
            onInputChange={(event, value) =>
              handleChangeText(column.name, event, value)
            }
            renderInput={params => (
              <TextField
                {...params}
                label={column.displayName}
                fullWidth
                multiline
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        )

      case "currency":
        //console.log(currentEntry[column.name])
        return (
          <CurrencyFormat
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={
              currentEntry && currentEntry[column.name]
                ? currentEntry[column.name]
                : 0
            }
            onValueChange={values => handleChangeCurrency(values, column.name)}
            thousandSeparator={getThousandSeparatorFromCurreny(
              currentUser.currency,
            )}
            decimalSeparator={getDecimalSeparatorFromCurrency(
              currentUser.currency,
            )}
            prefix={getPrefixFromCurrency(currentUser.currency)}
            suffix={getSuffixFromCurrency(currentUser.currency)}
            allowNegative={false}
            decimalScale={2}
            fullWidth
            customInput={TextField}
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
                <MenuItem key={selectValue} value={selectValue}>
                  {selectValue}
                </MenuItem>
              ))}
            </Select>
          </>
        )

      case "select":
        //if (currentEntry) console.log(currentEntry[column.name])
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

  const fields = columns
    ? columns.map(column => (
        <Grid
          key={column.order}
          item
          xs={column.order < 4 ? 6 : 12}
          className={classes.gridItem}
        >
          <FormControl className={classes.formControl}>
            {field(column)}
          </FormControl>
        </Grid>
      ))
    : null

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancel</Button>

          {selectedEntryId ? (
            <>
              <Button onClick={handleClose} color="secondary">
                Delete
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} color="primary">
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
  entriesArray: selectEntriesArray,
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
