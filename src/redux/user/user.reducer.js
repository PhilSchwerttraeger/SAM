import { UserActionTypes } from "./user.types"

const INITIAL_STATE = {
  currentUser: null,
  notification: { msg: null, type: null },
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      }

    case UserActionTypes.UPDATE_CURRENT_USER_START:
      return {
        ...state,
        isStoring: true,
      }

    case UserActionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isStoring: false,
      }

    case UserActionTypes.UPDATE_CURRENT_USER_FAILURE:
      return {
        ...state,
        isStoring: false,
        errorMessage: action.payload,
      }

    case UserActionTypes.INVOKE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      }

    default:
      return state
  }
}

export default userReducer
