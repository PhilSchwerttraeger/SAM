import { createSelector } from "reselect"

const selectTable = state => state.table

export const selectTableSections = createSelector(
  [selectTable],
  table => table.sections,
)
