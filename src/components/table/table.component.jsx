import React from "react"
import "./table.styles.scss"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  clearEntries,
} from "../../redux/entries/entries.actions"
import { fetchColumnsStartAsync } from "../../redux/columns/columns.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectEntriesMap } from "../../redux/entries/entries.selectors"
import { selectColumnsMap } from "../../redux/columns/columns.selectors"
import { compareColumns } from "../../redux/columns/columns.util"

const formatDateToString = (entry, propertyName) => {
  const options = {
    //weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const seconds = entry[propertyName].seconds
  const date = new Date(seconds * 1000)
  return date.toLocaleDateString("de-DE", options)
}

const formatCurrencyToString = (value, currency) => {
  switch (currency) {
    case "euro":
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value)

    case "dollar":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)

    default:
      break
  }
}

class Table extends React.Component {
  componentDidMount() {
    const {
      fetchEntriesStartAsync,
      fetchColumnsStartAsync,
      currentUser,
    } = this.props
    fetchEntriesStartAsync(currentUser)
    fetchColumnsStartAsync(currentUser)
  }

  componentWillUnmount() {
    clearEntries()
  }

  render() {
    const { entries, columns, currentUser } = this.props

    // Convert entry object to properties array
    const entryIds = entries ? Object.keys(entries).map(e => e) : null
    const entriesArray = entryIds ? entryIds.map(id => entries[id]) : null
    //const entriesPropertiesArray = entriesArray ? Object.keys(entriesArray[0]).map(e => e) : null

    // Convert column object to properties array
    const columnsIds = columns ? Object.keys(columns).map(e => e) : null
    const columnsArray = columnsIds ? columnsIds.map(id => columns[id]) : null
    columnsArray.sort(compareColumns)
    const columnsPropertiesArray = columnsArray
      ? Object.keys(columnsArray[0]).map(e => e)
      : null

    const headRow = columnsArray
      ? columnsArray.map(column => (
          <th key={column.name}>{column.displayName}</th>
        ))
      : null

    const tableDataEntries = entriesArray
      ? // Row
        entriesArray.map(entry => (
          <tr key={entry.id} className="row">
            {// Cell
            columnsArray.map(property => {
              // Skip entry's empty propertys (property that are defined in columns, but are actually not present in entry document)
              if (entry[property.name] === undefined) return null

              // Custom formatting depending on property type
              switch (property.type) {
                case "date":
                  const dateFormatted = formatDateToString(entry, property.name)
                  return <td key={property.name}>{dateFormatted}</td>

                case "currency":
                  const currencyFormatted = formatCurrencyToString(
                    entry[property.name],
                    currentUser.currency,
                  )
                  return <td key={property.name}>{currencyFormatted}</td>

                default:
                  return <td key={property.name}>{entry[property.name]}</td>
              }
            })}
          </tr>
        ))
      : null

    const headRowFromColumns = columnsPropertiesArray
      ? columnsPropertiesArray.map(property => (
          <th key={property}>{property}</th>
        ))
      : null

    const tableDataColumns = columnsArray
      ? // Row
        columnsArray.map(column => (
          <tr key={column.id} className="row">
            {// Cell
            columnsPropertiesArray.map(property => {
              let columnValue = column[property]

              if (typeof column[property] === "boolean") {
                columnValue = column[property] ? "true" : "false"
              }

              return <td key={property}>{columnValue}</td>
            })}
          </tr>
        ))
      : null

    //console.log(entries)
    return (
      <>
        <table className="table">
          <thead>
            <tr className="row">{headRow}</tr>
          </thead>
          <tbody>{tableDataEntries}</tbody>
        </table>

        <table className="table">
          <thead>
            <tr className="row">{headRowFromColumns}</tr>
          </thead>
          <tbody>{tableDataColumns}</tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  entries: selectEntriesMap,
  columns: selectColumnsMap,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
  fetchColumnsStartAsync: currentUser =>
    dispatch(fetchColumnsStartAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
