import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeFromCart } from '../reducers/cart'

const calctoppingCost = (totalToppingCost, topping) => totalToppingCost + topping.price
const singlePizzaCost = pizza => pizza.size.basePrice + pizza.toppings.reduce(calctoppingCost, 0)
const calcPizzaCost = (totalCost, pizza) => totalCost + singlePizzaCost(pizza)

const Cart = ({ pizzasInCart, totalCost, removeFromCart }) => (
  <div>
    <h1>Cart</h1>
    {pizzasInCart.length === 0 ? <div>No Items in Cart</div> :
      <ul>
        {pizzasInCart.map((pizza, index) => (
          <li key={index}>
            {pizza.size.name}: {pizza.toppings.map((topping) => topping.name).join(", ")} ... ${singlePizzaCost(pizza).toFixed(2)}
            <button style={{marginLeft: "3%"}} type="button" onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
    }
    <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
  </div>
)

const mapStateToProps = ({ cart }) => ({
  pizzasInCart: cart.pizzas,
  totalCost: cart.pizzas.length === 0 ? 0 : cart.pizzas.reduce(calcPizzaCost, 0)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { removeFromCart },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
