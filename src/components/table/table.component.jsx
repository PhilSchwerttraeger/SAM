import React from "react"
import "./table.styles.scss"
import { connect } from "react-redux"
import { fetchEntriesStartAsync } from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"

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

class Table extends React.Component {
  componentDidMount() {
    const { fetchEntriesStartAsync, currentUser } = this.props
    fetchEntriesStartAsync(currentUser)
  }

  render() {
    return (
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
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  fetchEntriesStartAsync: currentUser =>
    dispatch(fetchEntriesStartAsync(currentUser)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table)
