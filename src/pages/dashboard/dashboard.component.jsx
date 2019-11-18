import React from "react"
import { connect } from "react-redux"
import "./dashboard.styles.scss"
import Table from "../../components/table/table.component"
import { DashboardPageContainer } from "./dashboard.styles"
import {
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
  fetchEntriesStartAsync,
} from "../../redux/entries/entries.actions"
import {
  createColumnStartAsync,
  //updateColumnStartAsync,
  //deleteColumnStartAsync,
  fetchColumnsStartAsync,
} from "../../redux/columns/columns.actions"

const hardcodedCreateEntry = {
  createdAt: new Date(),
  direction: "in",
  interval: "weekly",
  value: 13.37,
  start: new Date(),
  description: "Normal description",
}

const hardcodedUpdateEntry = {
  createdAt: new Date(),
  direction: "in",
  interval: "weekly",
  value: 13.37,
  start: new Date(),
  description: "normal UPDATE, bitch!",
  id: "ttlqHI6qwbZqZldEp1cv",
}

const hardcodedEntryID = "hwfcgUhWAELUUhfXF5Yr"

const hardcodedCreateColumn = {
  order: 5,
  name: "specialdate",
  displayName: "Special Date",
  type: "date",
  isEditable: true,
  isVisible: true,
  isBaseForAnalysis: false,
}

class Dashboard extends React.Component {
  render() {
    const {
      createEntryStartAsync,
      updateEntryStartAsync,
      deleteEntryStartAsync,
      fetchEntriesStartAsync,

      createColumnStartAsync,
      fetchColumnsStartAsync,
    } = this.props

    return (
      <DashboardPageContainer>
        <Table />
        <h1>Entries</h1>
        <div>
          <button onClick={() => fetchEntriesStartAsync()}>
            fetch entries
          </button>
          <button onClick={() => createEntryStartAsync(hardcodedCreateEntry)}>
            create entry
          </button>
          <button onClick={() => updateEntryStartAsync(hardcodedUpdateEntry)}>
            Update entry
          </button>
          <button onClick={() => deleteEntryStartAsync(hardcodedEntryID)}>
            Delete entry with id {hardcodedEntryID}
          </button>
        </div>
        <h1>Columns</h1>
        <div>
          <button onClick={() => fetchColumnsStartAsync()}>
            fetch columns
          </button>
          <button onClick={() => createColumnStartAsync(hardcodedCreateColumn)}>
            create column
          </button>
        </div>
      </DashboardPageContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createEntryStartAsync: entryToCreate =>
    dispatch(createEntryStartAsync(entryToCreate)),
  updateEntryStartAsync: entryToUpdate =>
    dispatch(updateEntryStartAsync(entryToUpdate)),
  deleteEntryStartAsync: entryToDelete =>
    dispatch(deleteEntryStartAsync(entryToDelete)),
  fetchEntriesStartAsync: () => dispatch(fetchEntriesStartAsync()),

  createColumnStartAsync: columnToCreate =>
    dispatch(createColumnStartAsync(columnToCreate)),
  fetchColumnsStartAsync: () => dispatch(fetchColumnsStartAsync()),
})

export default connect(null, mapDispatchToProps)(Dashboard)
