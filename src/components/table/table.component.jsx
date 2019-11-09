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
    const entryIds = Object.keys(entries).map(e => e)
    const entriesArray = entryIds.map(id => entries[id])
    const entriesPropertiesArray = Object.keys(entriesArray[0]).map(e => e)
    console.log(entriesArray)

    //console.log(entries)
    return (
      <table className="table">
        <thead>
          <tr className="row">
            {entriesPropertiesArray.map(property => (
              <th key={property}>{property}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {entriesArray.map(entry => (
            <tr key={entry.id} className="row">
              {entriesPropertiesArray.map(property => (
                <td key={property}>{entry[property]}</td>
              ))}
            </tr>
          ))}
        </tbody>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table)
