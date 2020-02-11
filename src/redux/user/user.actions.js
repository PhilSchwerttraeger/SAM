import { UserActionTypes } from "./user.types"
import { firestore } from "../../firebase/firebase.util"

// RETURNS OBJECT OF TYPE AND PAYLOAD
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
})

export const updateCurrentUserStart = () => ({
  type: UserActionTypes.UPDATE_CURRENT_USER_START,
})

export const updateCurrentUserSuccess = user => ({
  type: UserActionTypes.UPDATE_CURRENT_USER_SUCCESS,
  payload: user,
})

export const updateCurrentUserFailure = errorMessage => ({
  type: UserActionTypes.UPDATE_CURRENT_USER_FAILURE,
  payload: errorMessage,
})

export const updateCurrentUserAsync = user => {
  return dispatch => {
    const UserDoc = firestore.collection(`users`).doc(user.id)

    dispatch(updateCurrentUserStart())

    UserDoc.set(user)
      .then(() => {
        dispatch(updateCurrentUserSuccess(user))
      })
      .catch(error => updateCurrentUserFailure(error.message))
  }
}

export const invokeNotification = notification => ({
  type: UserActionTypes.INVOKE_NOTIFICATION,
  payload: notification,
})
