import { createSelector } from "reselect"

// BUILDS MEMOIZED SELECTORS

// input selector (nested property of state)
const selectCart = state => state.cart

// CART ITEMS
// output selector: input selector + createSelector
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems,
)

// CART ITEM COUNT
// output selector: input selector + createSelector
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0,
    ),
)

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden,
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0,
    ),
)
