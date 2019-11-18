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

    default:
      return state
  }
}

export default columnsReducer
