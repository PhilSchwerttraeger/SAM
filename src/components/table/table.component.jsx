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
            entriesPropertiesArray.map(property => {
              if (property === "createdAt") {
                const options = {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }
                const seconds = entry[property].seconds
                const date = new Date(seconds * 1000)
                const localString = date.toLocaleDateString("de-DE", options)

                return <td key={property}>{localString}</td>
              } else {
                return <td key={property}>{entry[property]}</td>
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
