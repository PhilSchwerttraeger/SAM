import ColumnsActionTypes from "./columns.types"

const INITIAL_STATE = {
  columns: null,
  isFetching: false,
  isStoring: false,
  errorMessage: undefined,
}

const columnsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetching Columns

    case ColumnsActionTypes.FETCH_COLUMNS_START:
      return {
        ...state,
        isFetching: true,
      }
    case ColumnsActionTypes.FETCH_COLUMNS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        columns: action.payload,
      }
    case ColumnsActionTypes.FETCH_COLUMNS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    // Creating Column

    case ColumnsActionTypes.CREATE_COLUMN_START:
      return {
        ...state,
        isStoring: true,
      }
    case ColumnsActionTypes.CREATE_COLUMN_SUCCESS:
      return {
        ...state,
        isStoring: false,
        columns: { ...state.columns, [action.payload.id]: action.payload },
      }
    case ColumnsActionTypes.CREATE_COLUMN_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    // Updating Column

    case ColumnsActionTypes.UPDATE_COLUMN_START:
      return {
        ...state,
        isStoring: true,
      }
    case ColumnsActionTypes.UPDATE_COLUMN_SUCCESS:
      return {
        ...state,
        isStoring: false,
        columns: { ...state.columns, [action.payload.id]: action.payload },
      }
    case ColumnsActionTypes.UPDATE_COLUMN_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    // Deleting column

    case ColumnsActionTypes.DELETE_COLUMN_START:
      return {
        ...state,
        isStoring: true,
      }

    case ColumnsActionTypes.DELETE_COLUMN_SUCCESS:
      const deletedColumn = action.payload
      let reducedState = state.columns
      console.log("reduced state: ", reducedState)
      console.log("column id to delete: ", deletedColumn)
      console.log("delete from state: ", reducedState[deletedColumn])
      delete reducedState[deletedColumn]
      return {
        ...state,
        isStoring: false,
        columns: { ...reducedState },
      }

    case ColumnsActionTypes.DELETE_COLUMN_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    // Clearing columns

    case ColumnsActionTypes.CLEAR_COLUMNS:
      return INITIAL_STATE

    default:
      return state
  }
}

export default columnsReducer
