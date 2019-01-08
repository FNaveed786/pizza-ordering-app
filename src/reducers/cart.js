import {CLEAR_FORM} from "./form"
export const ADD_TO_CART = 'cart/ADD_TO_CART'
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART'


const initialState = {
  pizzas: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        pizzas: [...state.pizzas, action.pizza]
      }

    case REMOVE_FROM_CART:
      return {
        pizzas: [
          ...state.pizzas.slice(0, action.index),
          ...state.pizzas.slice(action.index + 1)
        ]
      }

    default:
      return state
  }
}

export const addToCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      pizza: {size: getState().form.size, toppings: getState().form.toppings}
    })

    dispatch({
      type: CLEAR_FORM
    })
  }
}

export const removeFromCart = (index) => {
  return dispatch => {
    dispatch({
      type: REMOVE_FROM_CART,
      index: index
    })
  }
}
