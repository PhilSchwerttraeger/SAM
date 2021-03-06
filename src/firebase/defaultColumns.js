const columns = [
  {
    order: 0,
    name: "direction",
    displayName: "Type",
    type: "direction",
    isEditable: false,
    isVisible: true,
    isBaseForAnalysis: false,
    values: ["in", "out"],
  },
  {
    order: 1,
    name: "value",
    displayName: "Value",
    type: "currency",
    isEditable: false,
    isVisible: true, // depricated, stored in table
    isBaseForAnalysis: true, // depricated, can be selected in analysis itself
  },
  {
    order: 2,
    name: "start",
    displayName: "Start",
    type: "date",
    isEditable: true,
    isVisible: true,
    isBaseForAnalysis: false,
  },
  {
    order: 3,
    name: "interval",
    displayName: "Interval",
    type: "interval",
    isEditable: false,
    isVisible: true,
    isBaseForAnalysis: false,
    values: [0, 1, 7, 14, 30, 60, 90, 120, 180, 360, 720, 1080, 1800, 3600],
  },
  {
    order: 4,
    name: "description",
    displayName: "Description",
    type: "text",
    isEditable: true,
    isVisible: true,
    isBaseForAnalysis: false,
  },
]

export default columns
