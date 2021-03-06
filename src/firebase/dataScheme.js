const users = {
  randomUserID: {
    userId: "u5utiL1RisdUsMVYQjQgfTp9TtQ2",
    email: "newuser@email.com",
    createdAt: "15. August 2019 um 17:18:42 UTC+2",

    accountType: "premium", // free
    language: "english", // german
    currency: "€", // dollar
    analysisActiveSections: ["sum", "average", "minimum", "maximum"],
    analysisActiveColumn: "value",

    columns: {
      randomColumnID: {
        order: 0, // unique
        name: "direction", // unique
        displayName: "Type",
        type: "select",
        isEditable: false,
        isVisible: true,
        isBaseForAnalysis: false,
        values: ["in", "out"],
      },
      randomColumnID: {
        order: 1,
        name: "interval",
        displayName: "Interval",
        type: "select",
        isEditable: false,
        isVisible: true,
        isBaseForAnalysis: false,
        values: [
          "once",
          "daily",
          "weekly",
          "monthly",
          "quarterly",
          "trimester",
          "semester",
          "annually",
          "2years",
          "3years",
          "5years",
          "10years",
          "none",
        ],
      },
      randomColumnID: {
        order: 2,
        name: "start",
        displayName: "Start",
        type: "date",
        isEditable: true,
        isVisible: true,
        isBaseForAnalysis: false,
      },
      randomColumnID: {
        order: 3,
        name: "value",
        displayName: "Value",
        type: "currency",
        isEditable: false,
        isVisible: true,
        isBaseForAnalysis: true,
      },
      randomColumnID: {
        order: 4,
        name: "description",
        displayName: "Description",
        type: "text",
        isEditable: true,
        isVisible: true,
        isBaseForAnalysis: false,
      },
    },
    entries: {
      randomEntryID: {
        createdAt: {
          seconds: 123456789,
          nanoseconds: 123456789,
        },
        direction: "in",
        interval: 7,
        value: 9514.54,

        start: {
          seconds: 123456789,
          nanoseconds: 123456789,
        },
        description: "Description text",
      },
    },
  },
}
