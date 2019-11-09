import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectEntries = state => state.entries

// CART ITEMS
// output selector: input selector + createSelector
export const selectEntries = createSelector(
  [selectEntries],
  entries => entries.entries,
)
