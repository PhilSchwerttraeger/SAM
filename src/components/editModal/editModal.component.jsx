import React from "react"
import { connect } from "react-redux"
import {
  fetchEntriesStartAsync,
  createEntryStartAsync,
  updateEntryStartAsync,
  deleteEntryStartAsync,
} from "../../redux/entries/entries.actions"
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectEntriesMap } from "../../redux/entries/entries.selectors"
import { selectColumnsArray } from "../../redux/columns/columns.selectors"
import "./editModal.styles.scss"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { createFirestoreDate } from "../../firebase/firebase.util"

function EditEntryModal({
  isOpen,
  closeModal,
  selectedEntryId,
  entries,
  columns,
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClose = () => {
    closeModal()
  }

  var entry = selectedEntryId ? entries[selectedEntryId] : {}

  const form = columns.map(column => {
    switch (column.type) {
      case "text":
        return (
          <TextField
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={entry ? entry[column.name] : null}
            type="text"
            margin="dense"
            autoFocus
            fullWidth
          />
        )

      case "currency":
        return (
          <TextField
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={entry ? entry[column.name] : null}
            type="text"
            margin="dense"
            autoFocus
            fullWidth
          />
        )

      case "date":
        return (
          <TextField
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={entry ? entry[column.name] : null}
            type="text"
            margin="dense"
            autoFocus
            fullWidth
          />
        )

      case "select":
        return (
          <TextField
            id={column.name}
            key={column.name}
            label={column.displayName}
            value={entry ? entry[column.name] : null}
            type="text"
            margin="dense"
            autoFocus
            fullWidth
          />
        )

      default:
        return <>Undefined type</>
    }
  })

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="Add "
      >
        {selectedEntryId ? (
          <DialogTitle id="modal-title">{"Edit entry"}</DialogTitle>
        ) : (
          <DialogTitle id="modal-title">{"New entry"}</DialogTitle>
        )}
        <DialogContent>{form}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>

          {selectedEntryId ? (
            <>
              <Button autoFocus onClick={handleClose} color="secondary">
                Delete
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Save
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} color="primary" autoFocus>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  entries: selectEntriesMap,
  columns: selectColumnsArray,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryModal)
