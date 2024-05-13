import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addMealToCart: (meal) => { },
  decreaseMealQuantity: (mealId) => { },
  increaseMealQuantity: (mealId) => { },
  resetStore: () => { }
});

export function cartReducer(state, action) {

  function increaseQuantity(state) {
    const updatedItems = [...state.items];
    const itemAddedIdx = updatedItems.findIndex(item => item.meal.id === action.payload);
    updatedItems[itemAddedIdx] = {
      ...updatedItems[itemAddedIdx],
      quantity: updatedItems[itemAddedIdx].quantity + 1
    }
    return { items: updatedItems };
  }

  function decreaseQuantity(state) {
    const updatedItems = [...state.items];
    const itemAddedIdx = updatedItems.findIndex(item => item.meal.id === action.payload);
    if (updatedItems[itemAddedIdx].quantity === 1) {
      updatedItems.splice(itemAddedIdx, 1);
    } else {
      updatedItems[itemAddedIdx] = {
        ...updatedItems[itemAddedIdx],
        quantity: updatedItems[itemAddedIdx].quantity - 1
      }
    }
    return { items: updatedItems };
  }

  switch (action.type) {
    case 'ADD_MEAL':
      const updatedItems = [...state.items];
      const existentItemId = updatedItems.findIndex((item) => item.meal.id === action.payload.id);
      const updatedItem = updatedItems[existentItemId];
      if (updatedItem) {
        updatedItems[existentItemId] = {
          meal: { ...updatedItem.meal },
          quantity: updatedItem.quantity + 1
        }
      } else {
        updatedItems.push({ meal: action.payload, quantity: 1 });
      }
      return {
        items: updatedItems
      }
    case 'QUANTITY_UP':
      return increaseQuantity(state);
    case 'QUANTITY_DOWN':
      return decreaseQuantity(state);
    case 'RESET_STORE':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  function addMealToCart(meal) {
    cartDispatch({
      type: 'ADD_MEAL',
      payload: meal
    });
  }
  function increaseMealQuantity(mealId) {
    cartDispatch({
      type: 'QUANTITY_UP',
      payload: mealId
    });
  }

  function decreaseMealQuantity(mealId) {
    cartDispatch({
      type: 'QUANTITY_DOWN',
      payload: mealId
    });
  }

  function resetStore() {
    cartDispatch({
      type: 'RESET_STORE'
    });
  }

  const ctxValue = {
    items: cartState.items,
    addMealToCart: addMealToCart,
    increaseMealQuantity: increaseMealQuantity,
    decreaseMealQuantity: decreaseMealQuantity,
    resetStore: resetStore
  }

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}
