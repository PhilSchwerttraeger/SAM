import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  fetchEntriesStartAsync,
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
  clearEntries,
  setSelectedEntry,
} from "../../redux/entries/entries.actions"
import { clearColumns } from "../../redux/columns/columns.actions"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import {
  selectEntriesArray,
  selectSelectedEntry,
} from "../../redux/entries/entries.selectors"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"
import {
  buildMUIdata,
  buildMUIcolumns,
  buildMUIoptions,
} from "./tableEntries.utils"
import MUIDataTable from "mui-datatables"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import EditEntryModal from "../editModal/editModal.component"

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editEntryModalIsOpen: false,
      selectedEntryId: null,
      selectedEntryIndex: null,
      tableStatePersist: {
        //Dynamic collection of props that are needed between table refreshes.
        searchText: "",
        filterList: [],
        columns: [],
      },
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
      selectedEntry,
      setSelectedEntry,
    } = this.props

    const setSelectedEntryPreprocessing = ({ id, index }) => {
      if (selectedEntry && id === selectedEntry.id) {
        console.log(
          "already selected, now deselecting entry with id " +
            id +
            " and index " +
            index,
        )

        setSelectedEntry({
          id: null,
          index: null,
        })
      } else {
        console.log("set selected entry to id " + id + " and index " + index)
        setSelectedEntry({
          id: id,
          index: index,
        })
      }
    }

    const addEntryClicked = () => {
      this.setState({
        ...this.state,
        selectedEntryId: null,
        selectedEntryIndex: null,
        editEntryModalIsOpen: true,
      })
    }

    const editEntryClicked = () => {
      this.setState({
        ...this.state,
        editEntryModalIsOpen: true,
      })
    }

    const handleTableChange = (action, tableState) => {
      console.log("Table state action: " + JSON.stringify(action))
      console.log("table state: " + JSON.stringify(tableState))
      if (action === "propsUpdate") {
        this.setState({
          tableStatePersist: {
            searchText: tableState.searchText,
            filterList: tableState.filterList,
            columns: tableState.columns,
          },
        })
      }
    }

    //Return all columns, their props, and any current state-related changes
    const MUIcolumns =
      //Define all of the alert table's columns and their default props and options as per the mui-datatables documentation

      columns && currentUser.currency
        ? buildMUIcolumns(columns, currentUser.currency)
        : []

    /* 
      //Loop thru columns and assign all column-specific settings that need to persist thru a data refresh
      for (let i = 0; i < columns2.length; i++) {
        //Assign the filter list to persist
        columns2[
          i
        ].options.filterList = this.state.tableStatePersist.filterList[i]
        if (this.state.tableStatePersist.columns[i] !== undefined) {
          //If 'display' has a value in tableStatePersist, assign that, or else leave it alone
          if (this.state.tableStatePersist.columns[i].hasOwnProperty("display"))
            columns2[i].options.display = this.state.tableStatePersist.columns[
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
              columns2[
                i
              ].options.sortDirection = this.state.tableStatePersist.columns[
                i
              ].sortDirection
          }
        }
      }
      */

    const MUIdata = entries && columns ? buildMUIdata(entries, columns) : []

    const MUIoptions = (MUIdata, deleteEntryStartAsync)
      ? buildMUIoptions(
          MUIdata,
          deleteEntryStartAsync,
          addEntryClicked,
          editEntryClicked,
          setSelectedEntryPreprocessing,
          selectedEntry,
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
        <EditEntryModal
          isOpen={this.state.editEntryModalIsOpen}
          closeModal={() =>
            this.setState({
              ...this.state,
              editEntryModalIsOpen: false,
            })
          }
          selectedEntryId={
            selectedEntry && selectedEntry.id ? selectedEntry.id : null
          }
        />
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
  selectedEntry: selectSelectedEntry,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
  createEntryStartAsync: entryToCreate =>
    dispatch(createEntryStartAsync(entryToCreate)),
  updateEntryStartAsync: entryToUpdate =>
    dispatch(updateEntryStartAsync(entryToUpdate)),
  deleteEntryStartAsync: entryToDelete =>
    dispatch(deleteEntryStartAsync(entryToDelete)),
  setSelectedEntry: entryToSetSelected =>
    dispatch(setSelectedEntry(entryToSetSelected)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
