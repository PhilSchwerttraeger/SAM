import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  selectIsColumnsFetching,
  selectIsColumnsStoring,
} from "../../redux/columns/columns.selectors"
import Settings from "./settings.component"

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsColumnsFetching || selectIsColumnsStoring,
})

const SettingsContainer = connect(mapStateToProps)(Settings)

// Just passing down props, nothing to render here
export default SettingsContainer
