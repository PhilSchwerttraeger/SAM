import React from "react"
import "./table.styles.scss"
import { connect } from "react-redux"
import { selectTableSections } from "../../redux/table/table.selectors"
import { createStructuredSelector } from "reselect"

const Table = ({ sections }) => (
  <div className="table">
    {sections.map(({ id, url, title }) => (
      <div className="row" key={id}>
        <div>{title} </div>
        <div>{id} </div>
        <div>{url} </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectTableSections,
})

export default connect(mapStateToProps)(Table)
