import React from "react"
import "./App.css"
import Dashboard from "./pages/dashboard/dashboard.component"
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
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Dashboard /> : <Redirect to="/signin" />
            }
          />
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
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
