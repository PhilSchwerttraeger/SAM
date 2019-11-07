import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors"
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import CollectionPage from "../collection/collection.component"
import { compose } from "redux"

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
})

const CollectionPageContainer = compose(
  connect(mapStateToProps), // second wrapper
  WithSpinner, // first wrapper
)(CollectionPage)

// Just passing down props, nothing to render here
export default CollectionPageContainer
