import React from "react"
import "./App.css"
import Dashboard from "./pages/dashboard/dashboard.component"
import Register from "./pages/register/register.component"
import Login from "./pages/login/login.component"
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
import { clearEntries } from "./redux/entries/entries.actions"
import { clearColumns } from "./redux/columns/columns.actions"
import { createStructuredSelector } from "reselect"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser, clearEntries, clearColumns } = this.props
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
        clearEntries()
        clearColumns()
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
              this.props.currentUser ? <Dashboard /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Login />
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Register />
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
  clearEntries: () => dispatch(clearEntries()),
  clearColumns: () => dispatch(clearColumns()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
