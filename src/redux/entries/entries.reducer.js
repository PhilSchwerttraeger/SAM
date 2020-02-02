import EntriesActionTypes from "./entries.types"

const INITIAL_STATE = {
  entries: null,
  isFetching: false,
  isStoring: false,
  errorMessage: undefined,
  selectedEntry: null,
  visibleEntries: null,
}

const entriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetching Entry

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

    // Clearing entries (restore default state)

    case EntriesActionTypes.CLEAR_ENTRIES:
      return INITIAL_STATE

    // Creating Entry

    case EntriesActionTypes.CREATE_ENTRY_START:
      return {
        ...state,
        isStoring: true,
      }
    case EntriesActionTypes.CREATE_ENTRY_SUCCESS:
      return {
        ...state,
        isStoring: false,
        entries: { ...state.entries, [action.payload.id]: action.payload },
      }
    case EntriesActionTypes.CREATE_ENTRY_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    // Updating Entry

    case EntriesActionTypes.UPDATE_ENTRY_START:
      return {
        ...state,
        isStoring: true,
      }
    case EntriesActionTypes.UPDATE_ENTRY_SUCCESS:
      return {
        ...state,
        isStoring: false,
        entries: { ...state.entries, [action.payload.id]: action.payload },
      }
    case EntriesActionTypes.UPDATE_ENTRY_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    // Deleting Entry

    case EntriesActionTypes.DELETE_ENTRY_START:
      return {
        ...state,
        isStoring: true,
      }
    case EntriesActionTypes.DELETE_ENTRY_SUCCESS:
      const deletedEntry = action.payload
      const reducedState = state.entries
      console.log("delete from state: ", reducedState[deletedEntry])
      delete reducedState[deletedEntry]
      console.log("new state now: ", state)

      return {
        ...state,
        isStoring: false,
        entries: { ...reducedState },
      }
    case EntriesActionTypes.DELETE_ENTRY_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    case EntriesActionTypes.SET_SELECTED_ENTRY:
      return {
        ...state,
        selectedEntry: action.payload,
      }

    case EntriesActionTypes.SET_VISIBLE_ENTRIES:
      return {
        ...state,
        visibleEntries: action.payload,
      }

    default:
      return state
  }
}

export default entriesReducer
