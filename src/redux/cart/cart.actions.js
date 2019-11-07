import CartActionTypes from "./cart.types"

// RETURNS OBJECT OF TYPE AND PAYLOAD
export const toggleCartHidden = cart => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
  //payload: OPTIONAL PROPERTY, NOT NEEDED HERE
})

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
})

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
})

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
})
