import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectColumns = state => state.columns

// output selector: input selector + createSelector
export const selectColumnsMap = createSelector(
  [selectColumns],
  columns => columns.columns,
)

export const selectColumnsArray = createSelector([selectColumns], columns => {
  const col = columns.columns
  const columnsIds = col ? Object.keys(col).map(e => e) : null
  return columnsIds ? columnsIds.map(id => col[id]) : null
})
