import { store } from "../store"
import { ColumnsActionTypes } from "./columns.types"
import {
  firestore,
  convertColumnsSnapshotToMap,
} from "../../firebase/firebase.util"

// Fetching columns

export const fetchColumnsStart = () => ({
  type: ColumnsActionTypes.FETCH_COLUMNS_START,
})

export const fetchColumnsSuccess = columnsMap => ({
  type: ColumnsActionTypes.FETCH_COLUMNS_SUCCESS,
  payload: columnsMap,
})

export const fetchColumnsFailure = errorMessage => ({
  type: ColumnsActionTypes.FETCH_COLUMNS_FAILURE,
  payload: errorMessage,
})

export const fetchColumnsStartAsync = () => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const columnsRef = firestore.collection(`users/${user.id}/columns`)
    dispatch(fetchColumnsStart())

    columnsRef
      .get()
      .then(snapshot => {
        const columnsMap = convertColumnsSnapshotToMap(snapshot)
        dispatch(fetchColumnsSuccess(columnsMap))
      })
      .catch(error => dispatch(fetchColumnsFailure(error.message)))
  }
}

// Clearing columns

export const clearColumns = () => ({
  type: ColumnsActionTypes.CLEAR_COLUMNS,
})

// Creating columns

export const createColumnStart = () => ({
  type: ColumnsActionTypes.CREATE_COLUMN_START,
})

export const createColumnSuccess = column => ({
  type: ColumnsActionTypes.CREATE_COLUMN_SUCCESS,
  payload: column,
})

export const createColumnFailure = errorMessage => ({
  type: ColumnsActionTypes.CREATE_COLUMN_FAILURE,
  payload: errorMessage,
})

export const createColumnStartAsync = column => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const ColumnDoc = firestore.collection(`users/${user.id}/columns`).doc()
    dispatch(createColumnStart())

    column.id = ColumnDoc.id

    // TODO
    ColumnDoc.set(column)
      .then(() => {
        dispatch(createColumnSuccess(column))
        //dispatch(fetchColumnsStartAsync())
      })
      .catch(error => dispatch(createColumnFailure(error.message)))
  }
}
