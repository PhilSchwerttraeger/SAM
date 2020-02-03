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

    // Deleting column

    case ColumnsActionTypes.DELETE_COLUMN_START:
      return {
        ...state,
        isStoring: true,
      }

    case ColumnsActionTypes.DELETE_COLUMN_SUCCESS:
      const deletedColumn = action.payload
      const reducedState = state.columns
      console.log("delete from state: ", reducedState[deletedColumn])
      delete reducedState[deletedColumn]
      console.log("new state now: ", state)
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
