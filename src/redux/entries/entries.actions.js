import { store } from "../store"
import { EntriesActionTypes } from "./entries.types"
import {
  firestore,
  convertEntriesSnapshotToMap,
  convertFirestoreDatesToJsDates,
} from "../../firebase/firebase.util"

// Fetching entries

export const fetchEntriesStart = () => ({
  type: EntriesActionTypes.FETCH_ENTRIES_START,
})

export const fetchEntriesSuccess = entriesMap => ({
  type: EntriesActionTypes.FETCH_ENTRIES_SUCCESS,
  payload: entriesMap,
})

export const fetchEntriesFailure = errorMessage => ({
  type: EntriesActionTypes.FETCH_ENTRIES_FAILURE,
  payload: errorMessage,
})

export const fetchEntriesStartAsync = () => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const entriesRef = firestore.collection(`users/${user.id}/entries`)
    dispatch(fetchEntriesStart())

    entriesRef
      .get()
      .then(snapshot => {
        const entriesMap = convertEntriesSnapshotToMap(snapshot)
        dispatch(fetchEntriesSuccess(entriesMap))
      })
      .catch(error => dispatch(fetchEntriesFailure(error.message)))
  }
}

// Clearing all entries (from state), set to default initial state

export const clearEntries = () => ({
  type: EntriesActionTypes.CLEAR_ENTRIES,
})

// Creating entry

export const createEntryStart = () => ({
  type: EntriesActionTypes.CREATE_ENTRY_START,
})

export const createEntrySuccess = entryWithId => ({
  type: EntriesActionTypes.CREATE_ENTRY_SUCCESS,
  payload: entryWithId,
})

export const createEntryFailure = errorMessage => ({
  type: EntriesActionTypes.CREATE_ENTRY_FAILURE,
  payload: errorMessage,
})

export const createEntryStartAsync = entry => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const EntryDoc = firestore.collection(`users/${user.id}/entries`).doc()
    dispatch(createEntryStart())

    entry.id = EntryDoc.id

    EntryDoc.set(entry)
      .then(() => {
        entry = convertFirestoreDatesToJsDates(entry)
        dispatch(createEntrySuccess(entry))
      })
      .catch(error => dispatch(createEntryFailure(error.message)))
  }
}

// Updating entry

export const updateEntryStart = () => ({
  type: EntriesActionTypes.UPDATE_ENTRY_START,
})

export const updateEntrySuccess = updatedEntry => ({
  type: EntriesActionTypes.UPDATE_ENTRY_SUCCESS,
  payload: updatedEntry,
})

export const updateEntryFailure = errorMessage => ({
  type: EntriesActionTypes.UPDATE_ENTRY_FAILURE,
  payload: errorMessage,
})

export const updateEntryStartAsync = updatedEntry => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const EntryDoc = firestore
      .collection(`users/${user.id}/entries`)
      .doc(updatedEntry.id)

    dispatch(updateEntryStart())

    EntryDoc.set(updatedEntry)
      .then(() => {
        dispatch(updateEntrySuccess(updatedEntry))
      })
      .catch(error => dispatch(updateEntryFailure(error.message)))
  }
}

// Deleting entry

export const deleteEntryStart = () => ({
  type: EntriesActionTypes.DELETE_ENTRY_START,
})

export const deleteEntrySuccess = deleteEntryId => ({
  type: EntriesActionTypes.DELETE_ENTRY_SUCCESS,
  payload: deleteEntryId,
})

export const deleteEntryFailure = errorMessage => ({
  type: EntriesActionTypes.DELETE_ENTRY_FAILURE,
  payload: errorMessage,
})

export const deleteEntryStartAsync = deleteEntryId => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const EntryDoc = firestore
      .collection(`users/${user.id}/entries`)
      .doc(deleteEntryId)

    dispatch(deleteEntryStart())

    EntryDoc.delete()
      .then(() => {
        dispatch(deleteEntrySuccess(deleteEntryId))
      })
      .catch(error => dispatch(deleteEntryFailure(error.message)))
  }
}

// Set selected Entry (no Firebase, no async action)
export const setSelectedEntry = entry => ({
  type: EntriesActionTypes.SET_SELECTED_ENTRY,
  payload: entry,
})
