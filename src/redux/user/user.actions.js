import { UserActionTypes } from "./user.types"

// RETURNS OBJECT OF TYPE AND PAYLOAD
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
})
