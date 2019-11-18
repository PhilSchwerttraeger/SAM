import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectColumns = state => state.columns

// output selector: input selector + createSelector
export const selectColumnsMap = createSelector(
  [selectColumns],
  columns => columns.columns,
)
