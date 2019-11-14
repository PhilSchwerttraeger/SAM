import React from "react"
import { connect } from "react-redux"
import "./dashboard.styles.scss"
import Table from "../../components/table/table.component"
import { DashboardPageContainer } from "./dashboard.styles"
import { createEntryStartAsync } from "../../redux/entries/entries.actions"

const hardcodedEntry = {
  createdAt: new Date(),
  direction: "in",
  interval: "weekly",
  value: 13.37,

  start: "13.12.2010",
  description: "Fancy new entry!",
}

class Dashboard extends React.Component {
  render() {
    const { createEntryStartAsync } = this.props

    return (
      <DashboardPageContainer>
        <Table />
        <div>
          <button onClick={() => createEntryStartAsync(hardcodedEntry)}>
            add entry
          </button>
        </div>
      </DashboardPageContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createEntryStartAsync: currentUser =>
    dispatch(createEntryStartAsync(currentUser)),
})

export default connect(null, mapDispatchToProps)(Dashboard)
