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
import SettingsContainer from "../settings/settingsContainer.component"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import { SpinnerContainer } from "../with-spinner/with-spinner.styles"

import {
  selectIsColumnsFetching,
  selectIsColumnsStoring,
} from "../../redux/columns/columns.selectors"

import {
  selectIsEntriesFetching,
  selectIsEntriesStoring,
} from "../../redux/entries/entries.selectors"

// To use, use { HeaderLogo } in HeaderContainer below
/*
const HeaderLogo = (
  <LogoContainer to="/">
    <Logo className="logo" />
  </LogoContainer>
)
*/

const Header = ({
  currentUser,
  selectIsColumnsFetching,
  selectIsColumnsStoring,
  selectIsEntriesFetching,
  selectIsEntriesStoring,
}) => {
  //console.log("selectIsColumnsFetching", selectIsColumnsFetching)
  //console.log("selectIsColumnsStoring", selectIsColumnsStoring)
  //console.log("selectIsEntriesFetching", selectIsEntriesFetching)
  //console.log("selectIsEntriesStoring", selectIsEntriesStoring)

  const isLoading =
    selectIsColumnsFetching ||
    selectIsColumnsStoring ||
    selectIsEntriesFetching ||
    selectIsEntriesStoring

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
        {isLoading ? <SpinnerContainer /> : null}
        <OptionLink as="div" onClick={() => setSettingsModalIsOpen(true)}>
          Settings
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
              Sign out
            </OptionLink>
          </Tooltip>
        ) : (
          <OptionLink to="/signin">Sign out</OptionLink>
        )}
      </OptionsContainer>

      <SettingsContainer isOpen={settingsModalIsOpen} closeModal={closeModal} />
    </HeaderContainer>
  )
}

// question: why does selector know state? oO
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectIsColumnsFetching: selectIsColumnsFetching,
  selectIsColumnsStoring: selectIsColumnsStoring,
  selectIsEntriesFetching: selectIsEntriesFetching,
  selectIsEntriesStoring: selectIsEntriesStoring,
})

export default connect(mapStateToProps)(Header)
