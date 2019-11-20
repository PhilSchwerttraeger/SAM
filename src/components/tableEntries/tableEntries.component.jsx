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

import MUIDataTable from "mui-datatables"

const formatDateToString = date => {
  const options = {
    //weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedDate = new Date(date.seconds * 1000)
  return formattedDate.toLocaleDateString("de-DE", options)
}

const formatCurrencyToString = (value, currency) => {
  switch (currency) {
    case "euro":
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value)

    case "dollar":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)

    default:
      break
  }
}

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

    // Build MUIDataTable's Columns
    const MUIcolumns = []
    if (columns) {
      columns.forEach(column => {
        if (column.isVisible) {
          MUIcolumns.push({
            name: column.name,
            label: column.displayName,
            options: {
              filter: true,
              sort: true,
            },
          })
        }
      })
    }
    //console.log(MUIcolumns)

    // Build MUIDataTable's Columns
    const MUIdata =
      entriesArray && columns
        ? // Row
          entriesArray.map(entry => {
            // For every entry create a new object and fill with properties
            let entryObject = {}

            // Enable Id displaying (debugging purpose)
            //entryObject[id] = entry.id,

            columns.forEach(property => {
              // Skip entry's empty propertys (property that are defined in columns, but are actually not present in entry document)
              if (entry[property.name] === undefined) {
                entryObject[property.name] = null
              } else {
                // Custom formatting depending on property type
                switch (property.type) {
                  case "date":
                    const dateFormatted = formatDateToString(
                      entry[property.name],
                    )
                    entryObject[property.name] = dateFormatted
                    break

                  case "currency":
                    const currencyFormatted = formatCurrencyToString(
                      entry[property.name],
                      currentUser.currency,
                    )
                    entryObject[property.name] = currencyFormatted
                    break

                  default:
                    entryObject[property.name] = entry[property.name]
                }
              }
            })

            return entryObject
          })
        : null
    //console.log(MUIdata)

    const MUIoptions = {
      filterType: "multiselect",
      responsive: "scroll",
      selectableRows: "multiple",
      selectableRowsOnClick: true,
      pagination: false,
    }

    return (
      <>
        <MUIDataTable
          title={"Entries"}
          data={MUIdata}
          columns={MUIcolumns}
          options={MUIoptions}
        />
      </>
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
