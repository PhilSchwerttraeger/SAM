import React from "react"
import "./dashboard.styles.scss"
import TableEntries from "../../components/tableEntries/tableEntries.component"
import { DashboardPageContainer } from "./dashboard.styles"
import TestButtons from "../../components/testButtons/testButtons.component"

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardPageContainer>
        <TableEntries />
        <TestButtons />
      </DashboardPageContainer>
    )
  }
}

export default Dashboard
