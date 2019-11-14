import React from "react"
import "./table.styles.scss"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  clearEntries,
} from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectEntriesMap } from "../../redux/entries/entries.selectors"
import { firestore } from "../../firebase/firebase.util"

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

class Table extends React.Component {
  componentDidMount() {
    const { fetchEntriesStartAsync, currentUser } = this.props
    fetchEntriesStartAsync(currentUser)
  }

  componentWillUnmount() {
    clearEntries()
  }

  render() {
    const { entries } = this.props
    const entryIds = entries ? Object.keys(entries).map(e => e) : null
    const entriesArray = entryIds ? entryIds.map(id => entries[id]) : null
    const entriesPropertiesArray = entriesArray
      ? Object.keys(entriesArray[0]).map(e => e)
      : null
    //console.log(entries, entryIds, entriesArray, entriesPropertiesArray)

    const headRow = entriesPropertiesArray
      ? entriesPropertiesArray.map(property => (
          <th key={property}>{property}</th>
        ))
      : null

    const tableData = entriesArray
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

    //console.log(entries)
    return (
      <table className="table">
        <thead>
          <tr className="row">{headRow}</tr>
        </thead>
        {tableData}
        <tbody></tbody>
      </table>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  entries: selectEntriesMap,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
