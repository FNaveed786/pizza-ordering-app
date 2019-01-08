import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addToCart } from '../reducers/cart'
import PizzaSizes from './PizzaSizes'
import Toppings from './Toppings'

const PizzaOrderForm = ({ addToCart }) => (
  <div>
    <PizzaSizes />
    <Toppings />
    <button style={{marginTop: "3%"}} type="button" onClick={() => addToCart()}>Add to Cart</button>
  </div>
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addToCart },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(PizzaOrderForm)
