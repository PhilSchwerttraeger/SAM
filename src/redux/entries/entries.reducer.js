import EntriesActionTypes from "./entries.types"

const INITIAL_STATE = {
  entries: null,
  isFetching: false,
  isStoring: false,
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

    case EntriesActionTypes.CREATE_ENTRY_START:
      return {
        ...state,
        isStoring: true,
      }
    case EntriesActionTypes.CREATE_ENTRY_SUCCESS:
      console.log(action.payload)
      const newEntry = action.payload
      return {
        ...state,
        isStoring: false,
        entries: { ...state.entries, newEntry },
      }
    case EntriesActionTypes.CREATE_ENTRY_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default entriesReducer
