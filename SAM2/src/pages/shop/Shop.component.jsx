import React from "react"
import "./Shop.styles.scss"
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import { Route } from "react-router-dom"
import CollectionPageContainer from "../collection/collection.container"
import { connect } from "react-redux"
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions"

// match available as prop because of route in App.js (match, location, history)
class Shop extends React.Component {
  componentDidMount() {
    // destructure from props
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})

export default connect(
  null,
  mapDispatchToProps,
)(Shop)
