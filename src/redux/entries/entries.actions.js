import { store } from "../store"
import { EntriesActionTypes } from "./entries.types"
import {
  firestore,
  convertEntriesSnapshotToMap,
} from "../../firebase/firebase.util"
import { selectCurrentUser } from "../user/user.selectors"

// RETURNS OBJECT OF TYPE AND PAYLOAD
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

export const clearEntries = () => ({
  type: EntriesActionTypes.CLEAR_ENTRIES,
})

