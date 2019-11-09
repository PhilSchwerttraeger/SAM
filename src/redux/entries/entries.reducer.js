import EntriesActionTypes from "./entries.types"

const INITIAL_STATE = {
  entries: null,
  isFetching: false,
  errorMessage: undefined,
}

const entriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EntriesActionTypes.FETCH_ENTRIES_START:
      return {
        ...state,
        isFetching: true,
      }
    case EntriesActionTypes.FETCH_ENTRIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        entries: action.payload,
      }
    case EntriesActionTypes.FETCH_ENTRIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case EntriesActionTypes.CLEAR_ENTRIES:
      return INITIAL_STATE

    default:
      return state
  }
}

export default entriesReducer
