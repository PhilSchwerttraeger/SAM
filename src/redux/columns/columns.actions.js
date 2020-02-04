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

// Creating column

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

    ColumnDoc.set(column)
      .then(() => {
        dispatch(createColumnSuccess(column))
      })
      .catch(error => dispatch(createColumnFailure(error.message)))
  }
}

// Updating column

export const updateColumnStart = () => ({
  type: ColumnsActionTypes.UPDATE_COLUMN_START,
})

export const updateColumnSuccess = column => ({
  type: ColumnsActionTypes.UPDATE_COLUMN_SUCCESS,
  payload: column,
})

export const updateColumnFailure = errorMessage => ({
  type: ColumnsActionTypes.UPDATE_COLUMN_FAILURE,
  payload: errorMessage,
})

export const updateColumnStartAsync = column => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const ColumnDoc = firestore
      .collection(`users/${user.id}/columns`)
      .doc(column.id)

    dispatch(updateColumnStart())

    ColumnDoc.set(column)
      .then(() => {
        dispatch(updateColumnSuccess(column))
      })
      .catch(error => dispatch(updateColumnFailure(error.message)))
  }
}

// REMEMBER:
// DELETE REMAINING PROPERTIES INSIDE ENTRIES WHEN DELETING WHOLE COLUMNS

// Deleting column

export const deleteColumnStart = () => ({
  type: ColumnsActionTypes.DELETE_COLUMN_START,
})

export const deleteColumnSuccess = () => ({
  type: ColumnsActionTypes.DELETE_COLUMN_SUCCESS,
})

export const deleteColumnFailure = errorMessage => ({
  type: ColumnsActionTypes.DELETE_COLUMN_FAILURE,
  payload: errorMessage,
})

export const deleteColumnStartAsync = columnId => {
  return dispatch => {
    const user = store.getState().user.currentUser
    const ColumnDoc = firestore
      .collection(`users/${user.id}/columns`)
      .doc(columnId)

    dispatch(deleteColumnStart())

    ColumnDoc.delete()
      .then(() => {
        dispatch(deleteColumnSuccess(columnId))
      })
      .catch(error => dispatch(deleteColumnFailure(error.message)))
  }
}
