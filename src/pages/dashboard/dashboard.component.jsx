import React from "react"
import { connect } from "react-redux"
import "./dashboard.styles.scss"
import Table from "../../components/table/table.component"
import { DashboardPageContainer } from "./dashboard.styles"
import {
  createEntryStartAsync,
  updateEntryStartAsync,
} from "../../redux/entries/entries.actions"

const hardcodedCreateEntry = {
  createdAt: new Date(),
  direction: "in",
  interval: "weekly",
  value: 13.37,

  start: "13.12.2010",
  description: "Normal description",
}

const hardcodedUpdateEntry = {
  createdAt: new Date(),
  direction: "in",
  interval: "weekly",
  value: 13.37,

  start: "13.12.2010",
  description: "normal UPDATE, bitch!",
  id: "ttlqHI6qwbZqZldEp1cv",
}

class Dashboard extends React.Component {
  render() {
    const { createEntryStartAsync, updateEntryStartAsync } = this.props

    return (
      <DashboardPageContainer>
        <Table />
        <div>
          <button onClick={() => createEntryStartAsync(hardcodedCreateEntry)}>
            create entry
          </button>
          <button onClick={() => updateEntryStartAsync(hardcodedUpdateEntry)}>
            Update entry
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
})

export default connect(null, mapDispatchToProps)(Dashboard)
