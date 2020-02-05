import React from "react"
import "./tableColumns.styles.scss"
import { connect } from "react-redux"
import { fetchColumnsStartAsync } from "../../redux/columns/columns.actions"
import { createStructuredSelector } from "reselect"
import { selectColumnsMap } from "../../redux/columns/columns.selectors"
import { compareColumns } from "../../redux/columns/columns.util"

class Table extends React.Component {
  render() {
    const { columns } = this.props

    // Convert column object to properties array
    const columnsIds = columns ? Object.keys(columns).map(e => e) : null
    const columnsArray = columnsIds ? columnsIds.map(id => columns[id]) : null

    let columnsPropertiesArray = []
    if (columnsArray) {
      columnsArray.sort(compareColumns)
      columnsPropertiesArray = Object.keys(columnsArray[0]).map(e => e)
    }
    console.log(columnsPropertiesArray)

    const headRowFromColumns = columnsPropertiesArray
      ? columnsPropertiesArray.map(property => (
          <th key={property}>{property}</th>
        ))
      : null

    const tableDataColumns = columnsArray
      ? // Row
        columnsArray.map(column => (
          <tr key={column.id} className="row">
            {// Cell
            columnsPropertiesArray.map(property => {
              let columnValue = column[property]

              if (typeof column[property] === "boolean") {
                columnValue = column[property] ? "true" : "false"
              }

              return <td key={property}>{columnValue}</td>
            })}
          </tr>
        ))
      : null

    return (
      <>
        <table className="table">
          <thead>
            <tr className="row">{headRowFromColumns}</tr>
          </thead>
          <tbody>{tableDataColumns}</tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  columns: selectColumnsMap,
})

const mapDispatchToProps = dispatch => ({
  fetchColumnsStartAsync: currentUser =>
    dispatch(fetchColumnsStartAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
