import React from "react"
import "./dashboard.styles.scss"
import Table from "../../components/table/table.component"
import { DashboardPageContainer } from "./dashboard.styles"

const Dashboard = () => (
  <DashboardPageContainer>
    <Table />
  </DashboardPageContainer>
)

export default Dashboard
