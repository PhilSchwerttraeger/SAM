import React from "react"
import { connect } from "react-redux"
import TableColumns from "../../components/tableColumns/tableColumns.component"
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

const TestButtons = ({
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
  fetchEntriesStartAsync,

  createColumnStartAsync,
  fetchColumnsStartAsync,
}) => {
  return (
    <div>
      <div>
        <h1>Dev Testing Section</h1>
        <button onClick={() => fetchEntriesStartAsync()}>fetch entries</button>
        <button onClick={() => createEntryStartAsync(hardcodedCreateEntry)}>
          create entry
        </button>
        <button onClick={() => updateEntryStartAsync(hardcodedUpdateEntry)}>
          Update entry
        </button>
        <button onClick={() => deleteEntryStartAsync(hardcodedEntryID)}>
          Delete entry with id {hardcodedEntryID}
        </button>
        <TableColumns />
        <button onClick={() => fetchColumnsStartAsync()}>fetch columns</button>
        <button onClick={() => createColumnStartAsync(hardcodedCreateColumn)}>
          create column
        </button>
      </div>
    </div>
  )
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

export default connect(null, mapDispatchToProps)(TestButtons)
