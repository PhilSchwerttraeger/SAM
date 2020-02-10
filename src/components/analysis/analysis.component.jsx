import React, { useState } from "react"
import {
  AnalysisContainer,
  Card,
  AnalysisMethodTitle,
  Left,
  Right,
} from "./analysis.styles"
import { formatCurrencyToString } from "../tableEntries/tableEntries.utils"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import Tooltip from "@material-ui/core/Tooltip"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const Analysis = ({
  visibleEntries,
  currentUser,
  entries,
  columns,
  ...rest
}) => {
  //console.log(visibleEntries, columns)
  const [target, setTarget] = useState("value")
  const [calcType, setCalcType] = useState("simple")
  //console.log(target)

  if (visibleEntries === null) return <></>

  const visibleEntriesIn = visibleEntries.filter(
    entry => entry.direction === "in",
  )

  const visibleEntriesOut = visibleEntries.filter(
    entry => entry.direction === "out",
  )

  const length = visibleEntries.length
  const lengthIn = visibleEntriesIn.length
  const lengthOut = visibleEntriesOut.length

  switch (calcType) {
    case "simple":
      visibleEntriesIn.forEach(entry => {
        entry[target + "_weighted"] = entry[target]
      })
      visibleEntriesOut.forEach(entry => {
        entry[target + "_weighted"] = entry[target]
      })
      break

    case "time-weighted-year":
      visibleEntriesIn.forEach(entry => {
        entry[target + "_weighted"] = (360 / entry.interval) * entry[target]
      })
      visibleEntriesOut.forEach(entry => {
        entry[target + "_weighted"] = (360 / entry.interval) * entry[target]
      })
      break

    case "time-weighted-month":
      visibleEntriesIn.forEach(entry => {
        entry[target + "_weighted"] = (30 / entry.interval) * entry[target]
      })
      visibleEntriesOut.forEach(entry => {
        entry[target + "_weighted"] = (30 / entry.interval) * entry[target]
      })
      break

    default:
      break
  }

  // SUM
  let sumIn = 0
  visibleEntriesIn.forEach(entry => {
    sumIn = entry[target + "_weighted"]
      ? sumIn + entry[target + "_weighted"]
      : sumIn
  })
  let sumOut = 0
  visibleEntriesOut.forEach(entry => {
    sumOut = entry[target + "_weighted"]
      ? sumOut + entry[target + "_weighted"]
      : sumOut
  })
  let sum = sumIn - sumOut

  // AVERAGE
  let avg = length ? sum / length : "-"
  let avgIn = lengthIn ? sumIn / lengthIn : "-"
  let avgOut = lengthOut ? sumOut / lengthOut : "-"

  sum = formatCurrencyToString(sum, currentUser.currency)
  sumIn = formatCurrencyToString(sumIn, currentUser.currency)
  sumOut = formatCurrencyToString(sumOut, currentUser.currency)
  avg = formatCurrencyToString(avg, currentUser.currency)
  avgIn = formatCurrencyToString(avgIn, currentUser.currency)
  avgOut = formatCurrencyToString(avgOut, currentUser.currency)

  return (
    <AnalysisContainer>
      <Card>
        <AnalysisMethodTitle>Config</AnalysisMethodTitle>
        <div>
          <Left>Target</Left>
          <Right>
            <FormControl>
              <Select
                labelId="target-select-label"
                id="target-select"
                value={target}
                onChange={event => setTarget(event.target.value)}
              >
                {columns ? (
                  [
                    ...columns
                      .filter(column => column.type === "currency")
                      .map(column => (
                        <MenuItem key={column.name} value={column.name}>
                          {column.displayName}
                        </MenuItem>
                      )),
                  ]
                ) : (
                  <>/</>
                )}
              </Select>
            </FormControl>
          </Right>
        </div>
        <div>
          <Left>Time</Left>
          <Left>Calculation</Left>
          <Right>
            <FormControl>
              <Select
                labelId="time-select-label"
                id="time-select"
                value={calcType}
                onChange={event => setCalcType(event.target.value)}
              >
                <MenuItem value={"simple"}>Simple</MenuItem>
                <MenuItem value={"time-weighted-month"}>
                  Time-weighted (Month)
                </MenuItem>
                <MenuItem value={"time-weighted-year"}>
                  Time-weighted (Year)
                </MenuItem>
              </Select>
            </FormControl>
          </Right>
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
            <Tooltip title="Weighted sum: All in - all out">
              <HelpOutlineIcon style={{ color: "grey", fontSize: 14 }} />
            </Tooltip>
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
            <Tooltip title="Weighted average from weighted sum (Sum all)">
              <HelpOutlineIcon style={{ color: "grey", fontSize: 14 }} />
            </Tooltip>
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
