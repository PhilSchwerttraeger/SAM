import React from "react"
import "./settings.styles.scss"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { updateCurrentUserAsync } from "../../redux/user/user.actions"

class Settings extends React.Component {
  render() {
    const { updateCurrentUserAsync, currentUser } = this.props

    const newCurrency = currentUser.currency === "euro" ? "dollar" : "euro"

    const alteredUser = { ...currentUser, currency: newCurrency }

    // setCurrentUser(alteredUser)
    return (
      <button onClick={() => updateCurrentUserAsync(alteredUser)}>
        Toggle Currency
      </button>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUserAsync: currentUser =>
    dispatch(updateCurrentUserAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
