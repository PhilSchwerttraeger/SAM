import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors"
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import CollectionsOverview from "./collections-overview.component"
import { compose } from "redux"

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
})

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps), // second wrapper
  WithSpinner, // first wrapper
)(CollectionsOverview)

// Just passing down props, nothing to render here
export default CollectionsOverviewContainer
