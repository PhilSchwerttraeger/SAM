import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  selectIsColumnsFetching,
  selectIsColumnsStoring,
} from "../../redux/columns/columns.selectors"
import Analysis from "./analysis.component"

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsColumnsFetching || selectIsColumnsStoring,
})

const AnalysisContainer = connect(mapStateToProps)(Analysis)

export default AnalysisContainer
