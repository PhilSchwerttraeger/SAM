import React from "react"
import { FormGroup, FormLabel, TextField } from "@material-ui/core"
import { IconButton, Tooltip } from "@material-ui/core"

import Add from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import FileCopyIcon from "@material-ui/icons/FileCopy"

/* 
const formatSecondsToString = seconds => {
  if (!seconds) return
  const options = {
    //weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedDate = new Date(seconds * 1000)
  return formattedDate.toLocaleDateString("de-DE", options)
}
*/

const formatDateToString = date => {
  if (date !== null) {
    date = new Date(date)
  } else {
    return null
  }
  const options = {
    //weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  return date.toLocaleDateString("de-DE", options)
}

export const formatCurrencyToString = (value, currency) => {
  switch (currency) {
    case "€":
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value)

    case "$":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)

    default:
      break
  }
}

export const formatIntervalToString = interval => {
  switch (interval) {
    case 0:
      return "Once"
    case 1:
      return "Day"
    case 7:
      return "Week"
    case 14:
      return "2 Weeks"
    case 21:
      return "3 Weeks"
    case 30:
      return "Month"
    case 60:
      return "2 Months"
    case 90:
      return "Quarter"
    case 120:
      return "Trimester"
    case 180:
      return "Semester"
    case 360:
      return "Year"
    case 720:
      return "2 Years"
    case 1080:
      return "3 Years"
    case 1800:
      return "5 Years"
    case 3600:
      return "10 Years"

    default:
      break
  }
}

// Build columns for MUI Data Table depending on column type and name
export const buildMUIcolumns = (columns, userCurrency) => {
  if (columns) {
    let MUIcolumns = columns.map(column => {
      // Create default column object and fill it accordingly
      let columnObject = {
        name: column.name,
        label: column.displayName,
        options: {},
      }
      columnObject.options.sort = true
      columnObject.options.display = column.isVisible
      columnObject.options.setCellProps = value => {
        return {
          style: {
            whiteSpace: "normal",
            height: "auto",
            overflow: "hidden",
            wordWrap: "break-word",
          },
        }
      }

      // For all columns typed "currency"
      if (column.type === "currency")
        columnObject.options = {
          customBodyRender: value =>
            formatCurrencyToString(value, userCurrency),

          filterType: "custom",
          customFilterListRender: v => {
            if (v[0] && v[1]) {
              return `Min ${column.displayName}: ${v[0]}, Max ${column.displayName}: ${v[1]}`
            } else if (v[0]) {
              return `Min ${column.displayName}: ${v[0]}`
            } else if (v[1]) {
              return `Max ${column.displayName}: ${v[1]}`
            }
            return false
          },
          filterOptions: {
            names: [],
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1]
              } else if (filters[0]) {
                return age < filters[0]
              } else if (filters[1]) {
                return age > filters[1]
              }
              return false
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel>{column.displayName}</FormLabel>
                <FormGroup row>
                  <TextField
                    label="Min value"
                    value={filterList[index][0] || ""}
                    onChange={event => {
                      filterList[index][0] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="Max value"
                    value={filterList[index][1] || ""}
                    onChange={event => {
                      filterList[index][1] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            ),
          },
        }

      // For all columns typed "date"
      if (column.type === "date")
        columnObject.options = {
          filter: false,
          customBodyRender: date => formatDateToString(date),
        }

      // For the specific column named "interval"
      if (column.name === "interval")
        columnObject.options = {
          filter: false,
          customBodyRender: value => formatIntervalToString(value),
        }

      return columnObject
    })
    /* 
    MUIcolumns.push({
      name: "id",
      label: "ID",
      options: {
        sort: true,
        filter: false,
        display: false,
      },
    })
    */
    return MUIcolumns
  }
}

export const buildMUIdata = (entriesArray, columns) => {
  if (entriesArray && columns) {
    return entriesArray.map(entry => {
      // For every entry create a new object and fill with properties
      let entryObject = {
        id: entry.id,
      }

      columns.forEach(property => {
        // Skip entry's empty propertys (property that are defined in columns, but are actually not present in entry document)
        if (entry[property.name] === undefined) {
          entryObject[property.name] = null
        } else entryObject[property.name] = entry[property.name]
      })

      return entryObject
    })
  } else return null
}

export const buildMUIoptions = (
  MUIdata,
  deleteEntryStartAsync,
  addEntryClicked,
  editEntryClicked,
  handleTableChange,
  getSearchText,
) => {
  // convert currently selected entry index to array (MUI datatables format), if no entry is selected (null) insert no array at all into MUI datatables

  return MUIdata
    ? {
        filterType: "multiselect",
        responsive: "stacked",
        selectableRows: "none",
        selectableRowsOnClick: true,
        pagination: false,
        downloadOptions: {
          filename: "SAM-Download.csv",
          separator: ",",
        },

        onTableChange: (action, newTableState) => {
          handleTableChange(action, newTableState, MUIdata)
        },

        onCellClick: (colData, cellMeta) => {
          const selectedIndex = cellMeta.dataIndex
          const selectedId = MUIdata[selectedIndex].id
          editEntryClicked(selectedId, selectedIndex)
        },

        searchText: getSearchText(),
        onSearchClose: () => {
          handleTableChange("search", { searchText: "" })
        },

        /* 
        rowsSelected:
          selectedEntry && selectedEntry.index !== null
            ? [selectedEntry.index]
            : null,
        */

        customToolbar: () => (
          <Tooltip title={"Add new entry"}>
            <IconButton onClick={() => addEntryClicked()}>
              <Add />
            </IconButton>
          </Tooltip>
        ),
        textLabels: {
          body: {
            noMatch: "No matching entries",
            toolTip: "Sort",
            columnHeaderTooltip: column => `Sort for ${column.label}`,
          },
          toolbar: {
            search: "Search",
            downloadCsv: "Download CSV",
            print: "Print",
            viewColumns: "Columns",
            filterTable: "Filter",
          },
          filter: {
            all: "All",
            title: "FILTERS",
            reset: "RESET",
          },
          viewColumns: {
            title: "Visible Columns",
            titleAria: "Show/Hide Table Columns",
          },
          selectedRows: {
            text: "entry selected",
            delete: "Delete",
            deleteAria: "Delete selected entry",
          },
        },
        customToolbarSelect: selectedRows => {
          //const selectedId = MUIdata[selectedRows.data[0].dataIndex].id
          //console.log("Selected ID", selectedId)
          return (
            <div style={{ paddingRight: "24px" }}>
              <Tooltip title={"Delete selected entry"}>
                <IconButton
                  onClick={() => {
                    const selectedId =
                      MUIdata[selectedRows.data[0].dataIndex].id
                    return window.confirm("Delete entry " + selectedId + "?")
                      ? deleteEntryStartAsync(selectedId)
                      : null
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Edit selected entry"}>
                <IconButton
                  onClick={() => {
                    const selectedIndex = selectedRows.data[0].dataIndex
                    const selectedId = MUIdata[selectedIndex].id
                    editEntryClicked(selectedId, selectedIndex)
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Duplicate selected entry"}>
                <IconButton onClick={() => alert("Duplicate")}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        },
      }
    : null
}
