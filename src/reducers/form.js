export const SET_SIZE = 'form/SET_SIZE'
export const ADD_TOPPING = 'form/ADD_TOPPING'
export const REMOVE_TOPPING = 'form/REMOVE_TOPPING'
export const UPDATE_DEFAULT_TOPPINGS = 'form/UPDATE_DEFAULT_TOPPINGS'
export const CLEAR_FORM = 'form/CLEAR_FORM'


const initialSize = {
  name: null,
  basePrice: null
}

const initialState = {
  size: initialSize,
  toppings: [],
  defaultToppingsPerSize: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_SIZE:
      return {
        ...state,
        toppings: action.size.name in state.defaultToppingsPerSize ? state.defaultToppingsPerSize[action.size.name] : [],
        size: action.size
      }

    case ADD_TOPPING:
      return {
        ...state,
        toppings: [...state.toppings, action.topping]
      }

    case REMOVE_TOPPING:
      return {
        ...state,
        toppings: state.toppings.filter(topping => topping.name !== action.topping.name)
    }

    case UPDATE_DEFAULT_TOPPINGS:
      return {
        ...state,
        toppings: action.toppings,
        defaultToppingsPerSize: {
          ...state.defaultToppingsPerSize,
          [action.size]: action.toppings
        }
      }

    case CLEAR_FORM:
      return {
        ...state,
        size: initialSize,
        toppings: []
      }

    default:
      return state
  }
}

export const updateSize = (size) => {
  return dispatch => {
    dispatch({
      type: SET_SIZE,
      size: size
    })
  }
}

export const updateDefaultToppings = (size, toppings) => {
  return dispatch => {
    dispatch({
      type: UPDATE_DEFAULT_TOPPINGS,
      toppings: toppings,
      size: size
    })
  }
}

export const toggleTopping = (topping, checked) => {
  return dispatch => {
    if(checked) {
      dispatch({
        type: ADD_TOPPING,
        topping: topping
      })
    } else if(!checked) {
      dispatch({
        type: REMOVE_TOPPING,
        topping: topping
      })
    }
  }
}
