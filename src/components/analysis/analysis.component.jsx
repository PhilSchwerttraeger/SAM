import React, { useState } from "react"
import {
  AnalysisContainer,
  Card,
  AnalysisMethodTitle,
  Left,
  Right,
  Row,
  Column,
  Value,
  ValueDisplay,
  ValueLabel,
} from "./analysis.styles"
import { formatCurrencyToString } from "../tableEntries/tableEntries.utils"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import Tooltip from "@material-ui/core/Tooltip"
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
        <Row>
          <Left>Target</Left>
          <Right>
            <FormControl>
              <Select
                labelId="target-select-label"
                id="target-select"
                value={target}
                onChange={event => setTarget(event.target.value)}
                style={{
                  fontSize: "0.875rem",
                }}
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
        </Row>
        <Row>
          <Left>
            Method{" "}
            <Tooltip
              title={
                "Simple: Takes currently filtered entries as they are. Weighted: Takes currently filtered entries and weighs them according to their interval."
              }
            >
              <HelpOutlineIcon style={{ color: "grey", fontSize: "0.75rem" }} />
            </Tooltip>
          </Left>
          <Right>
            <FormControl>
              <Select
                labelId="time-select-label"
                id="time-select"
                value={calcType}
                onChange={event => setCalcType(event.target.value)}
                style={{
                  fontSize: "0.875rem",
                }}
              >
                <MenuItem value={"simple"}>Simple</MenuItem>
                <MenuItem value={"time-weighted-month"}>
                  Month-weighted
                </MenuItem>
                <MenuItem value={"time-weighted-year"}>Year-weighted</MenuItem>
              </Select>
            </FormControl>
          </Right>
        </Row>
      </Card>
      <Card>
        <AnalysisMethodTitle>Visible entries</AnalysisMethodTitle>
        <Column>
          <Value>
            <ValueLabel>{length ? length : 0}</ValueLabel>
            <ValueDisplay>All</ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{lengthIn ? lengthIn : 0}</ValueLabel>
            <ValueDisplay>In</ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{lengthOut ? lengthOut : 0}</ValueLabel>
            <ValueDisplay>Out</ValueDisplay>
          </Value>
        </Column>
      </Card>
      <Card>
        <AnalysisMethodTitle>Sum</AnalysisMethodTitle>
        <Column>
          <Value>
            <ValueLabel>{sum}</ValueLabel>
            <ValueDisplay>
              All{" "}
              <Tooltip title="Weighted sum: All in - all out">
                <HelpOutlineIcon
                  style={{ color: "grey", fontSize: "0.75rem" }}
                />
              </Tooltip>
            </ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{sumIn}</ValueLabel>
            <ValueDisplay>In</ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{sumOut}</ValueLabel>
            <ValueDisplay>Out</ValueDisplay>
          </Value>
        </Column>
      </Card>
      <Card>
        <AnalysisMethodTitle>Average</AnalysisMethodTitle>
        <Column>
          <Value>
            <ValueLabel>{avg}</ValueLabel>
            <ValueDisplay>
              All{" "}
              <Tooltip title="Weighted average from weighted sum (Sum all)">
                <HelpOutlineIcon style={{ color: "grey", fontSize: 14 }} />
              </Tooltip>
            </ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{avgIn}</ValueLabel>
            <ValueDisplay>In</ValueDisplay>
          </Value>
          <Value>
            <ValueLabel>{avgOut}</ValueLabel>
            <ValueDisplay>Out</ValueDisplay>
          </Value>
        </Column>
      </Card>
    </AnalysisContainer>
  )
}

export default Analysis
