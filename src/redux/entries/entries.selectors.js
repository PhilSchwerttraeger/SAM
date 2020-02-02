import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectEntries = state => state.entries

// output selector: input selector + createSelector
export const selectEntriesMap = createSelector(
  [selectEntries],
  entries => entries.entries,
)

// output selector: input selector + createSelector
export const selectEntriesArray = createSelector([selectEntries], entries => {
  const entr = entries.entries
  const entriesIds = entr ? Object.keys(entr).map(e => e) : null
  return entriesIds ? entriesIds.map(id => entr[id]) : null
})

export const selectSelectedEntry = createSelector(
  [selectEntries],
  entries => entries.selectedEntry,
)

export const selectVisibleEntries = createSelector(
  [selectEntries],
  entries => entries.visibleEntries,
)
