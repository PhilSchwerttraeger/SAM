import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import cartReducer from "./cart/cart.reducer"
import { persistReducer } from "redux-persist"
// tell redux to use localstorage
import storage from "redux-persist/lib/storage"
import tableReducer from "./table/table.reducer"
import shopReducer from "./shop/shop.reducer"

// json config for redux-persist to use
const persistConfig = {
  key: "root",
  storage,
  // array containing the string names of any reducers we want to store
  //whitelist: ["cart", "table", "shop"],
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  table: tableReducer,
  shop: shopReducer,
})

export default persistReducer(persistConfig, rootReducer)
