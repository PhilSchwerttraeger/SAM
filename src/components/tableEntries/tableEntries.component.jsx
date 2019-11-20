import React from "react"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  clearEntries,
} from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectEntriesArray } from "../../redux/entries/entries.selectors"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"
import {
  buildMUIdata,
  buildMUIcolumns,
  buildMUIoptions,
} from "./tableEntries.utils"

import MUIDataTable from "mui-datatables"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"

class Table extends React.Component {
  componentDidMount() {
    const { fetchEntriesStartAsync, currentUser } = this.props
    fetchEntriesStartAsync(currentUser)
  }

  componentWillUnmount() {
    clearEntries()
  }

  render() {
    const { entries, columns, currentUser } = this.props

    const MUIcolumns = buildMUIcolumns(columns, currentUser.currency)
    const MUIdata = buildMUIdata(entries, columns)
    const MUIoptions = buildMUIoptions()

    // Customize MUI Theme to rearrange action buttons (integrate "add"-button)
    const getMuiTheme = () =>
      createMuiTheme({
        overrides: {
          MUIDataTableToolbar: {
            actions: {
              display: "flex",
              flex: "initial",
              // move all icons to the right
              "& > span, & > button": {
                order: 99,
              },
              // target the custom toolbar icon
              "& > span:last-child, & > button:last-child": {
                order: 1,
              },
              // target any icon
              "& > span:nth-child(4), & > button:nth-child(4)": {
                order: 2,
              },
            },
          },
        },
      })

    return (
      <div style={{ width: "100%" }}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Entries"}
            data={MUIdata}
            columns={MUIcolumns}
            options={MUIoptions}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  entries: selectEntriesArray,
  columns: selectColumnsArray,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
