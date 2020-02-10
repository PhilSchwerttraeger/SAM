import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  selectIsColumnsFetching,
  selectIsColumnsStoring,
} from "../../redux/columns/columns.selectors"
import {
  selectVisibleEntriesArray,
  selectEntriesArray,
} from "../../redux/entries/entries.selectors"
import Analysis from "./analysis.component"
import { selectCurrentUser } from "../../redux/user/user.selectors"

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsColumnsFetching || selectIsColumnsStoring,
  visibleEntries: selectVisibleEntriesArray,
  currentUser: selectCurrentUser,
  entries: selectEntriesArray,
})

const AnalysisContainer = connect(mapStateToProps)(Analysis)

export default AnalysisContainer
