import { EntriesActionTypes } from "./entries.types"
import {
  firestore,
  convertEntriesSnapshotToMap,
} from "../../firebase/firebase.util"

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

export const fetchEntriesStartAsync = currentUser => {
  console.log(currentUser)
  return dispatch => {
    const collectionRef = firestore.collection(
      `users/${currentUser.id}/entries`,
    )
    //const collectionRef = firestore.collection(`entries`)
    dispatch(fetchEntriesStart())

    collectionRef
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

