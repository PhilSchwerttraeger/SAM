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
import {
  fetchColumnsStartAsync,
  clearColumns,
} from "../../redux/columns/columns.actions"
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
      tableStatePersist: {
        filterList: [],
        columns: [],
      },
    }
  }

  componentDidMount() {
    const {
      fetchEntriesStartAsync,
      fetchColumnsStartAsync,
      currentUser,
    } = this.props
    fetchEntriesStartAsync(currentUser)
    fetchColumnsStartAsync(currentUser)
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

    const handleTableChange = (action, tableState) => {
      //console.log("Table state changed || " + JSON.stringify(action))
      //console.log("searchtext || " + JSON.stringify(tableState.searchText))
      //console.log("CURRENT STATE: ", tableState)

      if (action !== "propsUpdate") {
        if (action !== "search") {
          this.setState({
            tableStatePersist: {
              filterList: tableState.filterList,
              columns: tableState.columns,
            },
          })
        } else {
          this.searchText = tableState.searchText
        }
      }
      /* 
      const visibleRowsIndices = tableState.displayData.map(
        item => item.dataIndex,
      )
      const visibleEntries = visibleRowsIndices.map(index => MUIdata[index])
      const visibleValues = visibleRowsIndices.map(
        index => MUIdata[index].value,
      )
      console.log(action, tableState, visibleEntries, visibleValues)
      */
    }

    const getSearchText = () => this.searchText

    const MUIcolumns =
      columns && currentUser.currency
        ? buildMUIcolumns(columns, currentUser.currency)
        : []

    const MUIdata = entries && columns ? buildMUIdata(entries, columns) : []

    const MUIoptions = (MUIdata, deleteEntryStartAsync)
      ? buildMUIoptions(
          MUIdata,
          deleteEntryStartAsync,
          addEntryClicked,
          editEntryClicked,
          handleTableChange,
          getSearchText,
        )
      : []

    const getColumns = () => {
      //Define all of the alert table's columns and their default props and options as per the mui-datatables documentation
      let cols = MUIcolumns

      //Loop thru columns and assign all column-specific settings that need to persist thru a data refresh
      for (let i = 0; i < cols.length; i++) {
        //Assign the filter list to persist
        cols[i].options.filterList = this.state.tableStatePersist.filterList[i]
        if (this.state.tableStatePersist.columns[i] !== undefined) {
          //If 'display' has a value in tableStatePersist, assign that, or else leave it alone
          if (this.state.tableStatePersist.columns[i].hasOwnProperty("display"))
            cols[i].options.display = this.state.tableStatePersist.columns[
              i
            ].display
          //If 'sortDirection' has a value in tableStatePersist, assign that, or else leave it alone
          if (
            this.state.tableStatePersist.columns[i].hasOwnProperty(
              "sortDirection",
            )
          ) {
            //The sortDirection prop only permits sortDirection for one column at a time
            if (
              this.state.tableStatePersist.columns[i].sortDirection !== "none"
            )
              cols[
                i
              ].options.sortDirection = this.state.tableStatePersist.columns[
                i
              ].sortDirection
          }
        }
      }

      return cols
    }

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
            columns={getColumns()}
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

  fetchColumnsStartAsync: currentUser =>
    dispatch(fetchColumnsStartAsync(currentUser)),

  setSelectedEntry: entryToSetSelected =>
    dispatch(setSelectedEntry(entryToSetSelected)),

  setEditEntryModalIsOpen: boolean =>
    dispatch(setEditEntryModalIsOpen(boolean)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
