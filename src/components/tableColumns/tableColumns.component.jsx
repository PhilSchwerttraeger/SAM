import React from "react"
import "./tableColumns.styles.scss"
import { connect } from "react-redux"
import { fetchColumnsStartAsync } from "../../redux/columns/columns.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectColumnsMap } from "../../redux/columns/columns.selectors"
import { compareColumns } from "../../redux/columns/columns.util"

class Table extends React.Component {
  componentDidMount() {
    const { fetchColumnsStartAsync, currentUser } = this.props
    fetchColumnsStartAsync(currentUser)
  }

  componentWillUnmount() {}

  render() {
    const { columns } = this.props

    // Convert column object to properties array
    const columnsIds = columns ? Object.keys(columns).map(e => e) : null
    const columnsArray = columnsIds ? columnsIds.map(id => columns[id]) : null

    let columnsPropertiesArray = []
    if (columnsArray && typeof columnsArray.id !== "undefined") {
      columnsArray.sort(compareColumns)
      columnsPropertiesArray = Object.keys(columnsArray[0]).map(e => e)
    }

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

    //console.log(entries)
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
  currentUser: selectCurrentUser,
  columns: selectColumnsMap,
})

const mapDispatchToProps = dispatch => ({
  fetchColumnsStartAsync: currentUser =>
    dispatch(fetchColumnsStartAsync(currentUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
