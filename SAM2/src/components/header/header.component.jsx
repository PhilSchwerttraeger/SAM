import React from "react"
//import { Link } from "react-router-dom"
import "./header.styles.scss"
import { ReactComponent as Logo } from "../../assets/crown.svg"
import { auth } from "../../firebase/firebase.util"
import { connect } from "react-redux"
import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import { createStructuredSelector } from "reselect"
import { selectCartHidden } from "../../redux/cart/cart.selectors"
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
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN-IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
)

/*
// depricated:
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})
*/

/*
// depricated:
// SOPHISTICATED WAY TO DESTRUCTURE NESTED ITEMS
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
})
*/

/*
// depricated:
// equal to next version, but without createStructuredSelector
const mapStateToProps = ( state ) => ({
  currentUser: selectCurrentUser(state)
  hidden: selectCurrentUser(state)
})
*/

// question: why does selector know state? oO
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)
