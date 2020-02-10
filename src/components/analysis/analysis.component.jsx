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
  if (visibleEntries === null) return <></>
  //console.log(visibleEntries)
  const target = "value"
  const visibleEntriesIn = visibleEntries.filter(
    entry => entry.direction === "in",
  )

  const visibleEntriesOut = visibleEntries.filter(
    entry => entry.direction === "out",
  )

  const length = visibleEntries.length
  const lengthIn = visibleEntriesIn.length
  const lengthOut = visibleEntriesOut.length

  // SUM
  let sumIn = 0
  visibleEntriesIn.forEach(entry => {
    sumIn = sumIn + entry[target]
  })
  let sumOut = 0
  visibleEntriesOut.forEach(entry => {
    sumOut = sumOut + entry[target]
  })
  let sum = sumIn - sumOut

  // AVERAGE
  let avg = length ? sum / length : "-"
  let avgIn = lengthIn ? sumIn / lengthIn : "-"
  let avgOut = lengthOut ? sumOut / lengthOut : "-"


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
          <Right>{length ? length : 0}</Right>
        </div>
        <div>
          <Left>Visible entries (In)</Left>
          <Right>{lengthIn ? lengthIn : 0}</Right>
        </div>
        <div>
          <Left>Visible entries (Out)</Left>
          <Right>{lengthOut ? lengthOut : 0}</Right>
        </div>
      </Card>
      <Card>
        <AnalysisMethodTitle>Sum</AnalysisMethodTitle>
        <div>
          <Left>
            All{" "}
          </Left>
          <Right>{sum}</Right>
        </div>
        <div>
          <Left>In</Left>
          <Right>{sumIn}</Right>
        </div>
        <div>
          <Left>Out</Left>
          <Right>{sumOut}</Right>
        </div>
      </Card>
      <Card>
        <AnalysisMethodTitle>Average</AnalysisMethodTitle>
        <div>
          <Left>
            All{" "}
          </Left>

          <Right>{avg}</Right>
        </div>
        <div>
          <Left>In</Left>
          <Right>{avgIn}</Right>
        </div>
        <div>
          <Left>Out</Left>
          <Right>{avgOut}</Right>
        </div>
      </Card>
    </AnalysisContainer>
  )
}

export default Analysis
