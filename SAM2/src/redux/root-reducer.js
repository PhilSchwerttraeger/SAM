import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import cartReducer from "./cart/cart.reducer"
import { persistReducer } from "redux-persist"
// tell redux to use localstorage
import storage from "redux-persist/lib/storage"
import directoryReducer from "./directory/directory.reducer"
import shopReducer from "./shop/shop.reducer"

// json config for redux-persist to use
const persistConfig = {
  key: "root",
  storage,
  // array containing the string names of any reducers we want to store
  whitelist: ["cart"],
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
})

export default persistReducer(persistConfig, rootReducer)
