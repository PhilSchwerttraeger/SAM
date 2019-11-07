import React from "react"
import "./App.css"
import Home from "./pages/home/Home.component"
import Shop from "./pages/shop/Shop.component"
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import { Switch, Route, Redirect } from "react-router-dom"
import Header from "./components/header/header.component"
import {
  auth,
  createUserProfileDocument,
  //addCollectionAndDocuments,
} from "./firebase/firebase.util"
import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/user.actions"
import { selectCurrentUser } from "./redux/user/user.selectors"
import { createStructuredSelector } from "reselect"
import CheckoutPage from "./pages/checkout/checkout.component"
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {
      setCurrentUser,
      //collectionsArray
    } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth can be null when signed out
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser(
            {
              id: snapShot.id,
              ...snapShot.data(),
            },

            () => {
              console.log(this.state)
            },
          )
        })
      } else {
        setCurrentUser(userAuth)
        /* One-time adding items to database (convenience functions)
        addCollectionAndDocuments(
          "collections",
          collectionsArray.map(({ title, items }) => ({ title, items })),
        )
        */
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
