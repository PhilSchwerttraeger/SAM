import React from "react"
import "./dashboard.styles.scss"
import TableEntries from "../../components/tableEntries/tableEntries.component"
import { DashboardPageContainer } from "./dashboard.styles"
import TestButtons from "../../components/testButtons/testButtons.component"
import EditEntryModal from "../../components/editModal/editModal.component"

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardPageContainer>
        <TableEntries />
        <TestButtons />
        <EditEntryModal />
      </DashboardPageContainer>
    )
  }
}

export default Dashboard
