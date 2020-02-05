import React from "react"
//import { Link } from "react-router-dom"
import "./header.styles.scss"
//import { ReactComponent as Logo } from "../../assets/crown.svg"
import { auth } from "../../firebase/firebase.util"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import {
  HeaderContainer,
  //LogoContainer,
  OptionsContainer,
  //OptionDiv,
  OptionLink,
} from "./header.styles"
import { clearEntries } from "../../redux/entries/entries.actions"
import Settings from "../../components/settings/settings.component"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"

// To use, use { HeaderLogo } in HeaderContainer below
/*
const HeaderLogo = (
  <LogoContainer to="/">
    <Logo className="logo" />
  </LogoContainer>
)
*/

const Header = ({ currentUser }) => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = React.useState(false)

  const closeModal = () => {
    setSettingsModalIsOpen(false)
  }

  let userName = ""
  if (currentUser) {
    userName =
      currentUser && currentUser.displayName
        ? currentUser.displayName
        : currentUser.email
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))
  const title = fullScreen ? "SAM" : "Simple Account Manager"

  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <OptionsContainer>
        <OptionLink as="div" onClick={() => setSettingsModalIsOpen(true)}>
          SETTINGS
        </OptionLink>
        {currentUser ? (
          <Tooltip title={userName} aria-label="Log-Out" arrow>
            <OptionLink
              as="div"
              onClick={() => {
                clearEntries()
                auth.signOut()
              }}
            >
              SIGN OUT
            </OptionLink>
          </Tooltip>
        ) : (
          <OptionLink to="/signin">SIGN-IN</OptionLink>
        )}
      </OptionsContainer>

      <Settings isOpen={settingsModalIsOpen} closeModal={closeModal} />
    </HeaderContainer>
  )
}

// question: why does selector know state? oO
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(Header)
