import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
// tell redux to use localstorage
import storage from "redux-persist/lib/storage"
import userReducer from "./user/user.reducer"
import entriesReducer from "./entries/entries.reducer"
import columnsReducer from "./columns/columns.reducer"

// json config for redux-persist to use
const persistConfig = {
  key: "root",
  storage,
  // array containing the string names of any reducers we want to store
  //whitelist: ["cart", "table", "shop"],
}

const rootReducer = combineReducers({
  user: userReducer,
  entries: entriesReducer,
  columns: columnsReducer,
})

export default persistReducer(persistConfig, rootReducer)
