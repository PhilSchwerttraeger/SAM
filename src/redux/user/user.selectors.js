import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectUser = state => state.user

// CART ITEMS
// output selector: input selector + createSelector
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser,
)
