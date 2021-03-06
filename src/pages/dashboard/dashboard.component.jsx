import React from "react"
import "./dashboard.styles.scss"
import TableEntries from "../../components/tableEntries/tableEntries.component"
import { DashboardPageContainer } from "./dashboard.styles"
//import TestButtons from "../../components/testButtons/testButtons.component"
import EditEntryModal from "../../components/editModal/editModal.component"
import AnalysisContainer from "../../components/analysis/analysisContainer.component"
import NotificationContainer from "../../components/notification/notificationContainer.component"

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardPageContainer>
        <AnalysisContainer />
        <TableEntries />
        {/* <TestButtons /> */}
        <EditEntryModal />
        <NotificationContainer />
      </DashboardPageContainer>
    )
  }
}

export default Dashboard
