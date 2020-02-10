import React from "react"
import {
  AnalysisContainer,
  Card,
  AnalysisMethodTitle,
  Left,
  Right,
} from "./analysis.styles"
import { formatCurrencyToString } from "../tableEntries/tableEntries.utils"

const Analysis = ({ visibleEntries, currentUser, entries, ...rest }) => {
  console.log(visibleEntries)

  return (
    <AnalysisContainer>
      <Card>
        <AnalysisMethodTitle>Config</AnalysisMethodTitle>
        <div>
          <Left>Target</Left>
          <Right>Value</Right>
        </div>
      </Card>
      <Card>
        <AnalysisMethodTitle>Stats</AnalysisMethodTitle>
        <div>
          <Left>Visible entries</Left>
        </div>
        <div>
          <Left>Visible entries (In)</Left>
        </div>
        <div>
          <Left>Visible entries (Out)</Left>
        </div>
      </Card>
      <Card>
        <AnalysisMethodTitle>Sum</AnalysisMethodTitle>
        <div>
          <Left>
            All{" "}
          </Left>
        </div>
        <div>
          <Left>In</Left>
        </div>
        <div>
          <Left>Out</Left>
        </div>
      </Card>
      <Card>
        <AnalysisMethodTitle>Average</AnalysisMethodTitle>
        <div>
          <Left>
            All{" "}
          </Left>

        </div>
        <div>
          <Left>In</Left>
        </div>
        <div>
          <Left>Out</Left>
        </div>
      </Card>
    </AnalysisContainer>
  )
}

export default Analysis
