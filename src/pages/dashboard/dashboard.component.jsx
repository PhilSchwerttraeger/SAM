import React from "react"
import { connect } from "react-redux"
import "./dashboard.styles.scss"
import TableEntries from "../../components/tableEntries/tableEntries.component"
import TableColumns from "../../components/tableColumns/tableColumns.component"
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
import Settings from "../../components/settings/settings.component"
import { createFirestoreDate } from "../../firebase/firebase.util"

const hardcodedCreateEntry = {
  createdAt: createFirestoreDate(new Date()),
  direction: "in",
  interval: 7,
  value: 13.37,
  start: createFirestoreDate(new Date()),
  description: "fresh text",
}

const hardcodedUpdateEntry = {
  createdAt: createFirestoreDate(new Date()),
  direction: "out",
  interval: 7,
  value: 1337,
  start: createFirestoreDate(new Date()),
  description: "updated text",
  id: "ttlqHI6qwbZqZldEp1cv",
}

const hardcodedEntryID = "hwfcgUhWAELUUhfXF5Yr"

const hardcodedCreateColumn = {
  order: 6,
  name: "sometext",
  displayName: "Some Text",
  type: "text",
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
        <TableEntries />
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
        <TableColumns />
        <div>
          <button onClick={() => fetchColumnsStartAsync()}>
            fetch columns
          </button>
          <button onClick={() => createColumnStartAsync(hardcodedCreateColumn)}>
            create column
          </button>
        </div>

        <Settings />
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
