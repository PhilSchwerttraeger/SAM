import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  fetchEntriesStartAsync,
  deleteEntryStartAsync,
  clearEntries,
  setSelectedEntry,
  setEditEntryModalIsOpen,
} from "../../redux/entries/entries.actions"
import { clearColumns } from "../../redux/columns/columns.actions"
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
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { fetchEntriesStartAsync, currentUser } = this.props
    fetchEntriesStartAsync(currentUser)
  }

  componentWillUnmount() {
    clearEntries()
    clearColumns()
  }

  render() {
    const {
      entries,
      columns,
      currentUser,
      deleteEntryStartAsync,
      setSelectedEntry,
      setEditEntryModalIsOpen,
    } = this.props

    const addEntryClicked = () => {
      setSelectedEntry({
        id: null,
        index: null,
      })
      setEditEntryModalIsOpen(true)
    }

    const editEntryClicked = (id, index) => {
      setSelectedEntry({
        id: id,
        index: index,
      })
      setEditEntryModalIsOpen(true)
    }

    const MUIcolumns =
      columns && currentUser.currency
        ? buildMUIcolumns(columns, currentUser.currency)
        : []

    const MUIdata = entries && columns ? buildMUIdata(entries, columns) : []

    const handleTableChange = (action, tableState) => {
      const visibleRowsIndices = tableState.displayData.map(
        item => item.dataIndex,
      )
      const visibleEntries = visibleRowsIndices.map(index => MUIdata[index])
      const visibleValues = visibleRowsIndices.map(
        index => MUIdata[index].value,
      )
      console.log(action, tableState, visibleEntries, visibleValues)
    }

    const MUIoptions = (MUIdata, deleteEntryStartAsync)
      ? buildMUIoptions(
          MUIdata,
          deleteEntryStartAsync,
          addEntryClicked,
          editEntryClicked,
          handleTableChange,
        )
      : []

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
          MuiTableCell: {
            root: {
              borderBottom: "0px",
            },
          },
          MUIDataTableBodyCell: {
            stackedCommon: {
              height: "auto !important",
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
  deleteEntryStartAsync: entryToDelete =>
    dispatch(deleteEntryStartAsync(entryToDelete)),
  setSelectedEntry: entryToSetSelected =>
    dispatch(setSelectedEntry(entryToSetSelected)),
  setEditEntryModalIsOpen: boolean =>
    dispatch(setEditEntryModalIsOpen(boolean)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
