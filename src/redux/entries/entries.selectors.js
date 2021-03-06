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

export const selectEditModalIsOpen = createSelector(
  [selectEntries],
  entries => entries.editEntryModalIsOpen,
)

export const selectVisibleEntriesArray = createSelector(
  [selectEntries],
  entries =>
    entries.visibleEntries
      ? entries.visibleEntries.map(entry => entries.entries[entry.id])
      : entries.entries
      ? Object.keys(entries.entries)
          .map(e => e)
          .map(id => entries.entries[id])
      : null,
)

export const selectIsEntriesFetching = createSelector(
  [selectEntries],
  entries => entries.isFetching,
)

export const selectIsEntriesStoring = createSelector(
  [selectEntries],
  entries => entries.isStoring,
)
