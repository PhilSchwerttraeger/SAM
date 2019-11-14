import React from "react"
//import { Link } from "react-router-dom"
import "./header.styles.scss"
import { ReactComponent as Logo } from "../../assets/crown.svg"
import { auth } from "../../firebase/firebase.util"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  //OptionDiv,
  OptionLink,
} from "./header.styles"
import { clearEntries } from "../../redux/entries/entries.actions"

// To use, use { HeaderLogo } in HeaderContainer below
const HeaderLogo = (
  <LogoContainer to="/">
    <Logo className="logo" />
  </LogoContainer>
)

const Header = ({ currentUser }) => {
  let userName = ""
  if (currentUser) {
    userName =
      currentUser && currentUser.displayName
        ? currentUser.displayName
        : currentUser.email
  }
  return (
    <HeaderContainer>
      <h1>SIMPLE ACCOUNT MANAGER</h1>
      <OptionsContainer>
        <OptionLink as="div" onClick={() => alert()}>
          SETTINGS
        </OptionLink>
        <OptionLink as="div" onClick={() => alert()}>
          PROFILE
        </OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={() => {
              clearEntries()
              auth.signOut()
            }}
          >
            SIGN {userName} OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN-IN</OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  )
}

// question: why does selector know state? oO
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(Header)
