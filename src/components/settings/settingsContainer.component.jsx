import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  selectIsColumnsFetching,
  selectIsColumnsStoring,
} from "../../redux/columns/columns.selectors"
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import Settings from "./settings.component"
import { compose } from "redux"

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsColumnsFetching || selectIsColumnsStoring,
})

const SettingsContainer = compose(
  connect(mapStateToProps), // second wrapper
  WithSpinner, // first wrapper
)(Settings)

// Just passing down props, nothing to render here
export default SettingsContainer
