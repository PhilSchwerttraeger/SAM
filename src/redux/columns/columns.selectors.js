import { createSelector } from "reselect"
import { compareColumns } from "../../redux/columns/columns.util"

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
  const columnsArray = columnsIds ? columnsIds.map(id => col[id]) : null
  return columnsArray ? columnsArray.sort(compareColumns) : null
})

export const selectIsColumnsFetching = createSelector(
  [selectColumns],
  columns => columns.isFetching,
)

export const selectIsColumnsStoring = createSelector(
  [selectColumns],
  columns => columns.isStoring,
)
