import React from "react"
import { AnalysisContainer, Configuration } from "./analysis.styles"
import Sum from "./sum/sum.component"
import Average from "./average/average.component"
import Stats from "./stats/stats.component"
import Paper from "@material-ui/core/Paper"

const Analysis = () => {
  return (
    <AnalysisContainer>
      <Configuration>
        <Paper />
      </Configuration>
      <Sum />
      <Average />
      <Stats />
    </AnalysisContainer>
  )
}

export default Analysis
