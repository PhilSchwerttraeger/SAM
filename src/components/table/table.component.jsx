import React from "react"
import "./table.styles.scss"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

const entries = [
  {
    id: 0,
    title: "title0",
    url: "url0",
  },
  {
    id: 1,
    title: "title1",
    url: "url1",
  },
  {
    id: 2,
    title: "title2",
    url: "url2",
  },
]

const Table = () => (
  <div className="table">
    {entries.map(({ id, url, title }) => (
      <div className="row" key={id}>
        <div>{id}</div>
        <div>{title}</div>
        <div>{url}</div>
      </div>
    ))}
  </div>
)

export default Table
