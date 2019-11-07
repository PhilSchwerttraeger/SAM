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

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink as="div" onClick={() => alert()}>
        SETTINGS
      </OptionLink>
      <OptionLink as="div" onClick={() => alert()}>
        PROFILE
      </OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN-IN</OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
)

// question: why does selector know state? oO
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(Header)
