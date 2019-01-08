import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleTopping, updateDefaultToppings } from '../reducers/form'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TOPPINGS_FOR_SIZE = gql`
  query PizzaSizeByName($size: PizzaSizes!) {
    pizzaSizeByName(name: $size) {
      toppings {
  			topping {
          name,
          price
        },
        defaultSelected
      }
  	}
  }
`;

const Toppings = ({ size, toggleTopping, selectedToppings, maxToppings, updateDefaultToppings }) => (
  <div>
    <h1>Toppings</h1>
    {size == null ? <div>Please select a pizza size first</div> :
      <Query
        query={GET_TOPPINGS_FOR_SIZE}
        variables={{size: size.toUpperCase()}}
        onCompleted={(data) => updateDefaultToppings(size, data.pizzaSizeByName.toppings.filter((topping) => topping.defaultSelected).map((topping) => topping.topping))}
      >
        {({ data: { pizzaSizeByName }, loading }) => {
          if (loading || !pizzaSizeByName) {
            return <div>Loading ...</div>;
          }

          return (
            <div>
            {pizzaSizeByName.toppings.map(topping => (
              <div key={topping.name}>
                <input
                  type="checkbox"
                  checked={selectedToppings.includes(topping.topping.name)}
                  value={JSON.stringify(topping)}
                  disabled={maxToppings == null ? false : !selectedToppings.includes(topping.topping.name) && selectedToppings.length >= maxToppings}
                  onChange={(e) => toggleTopping(JSON.parse(e.target.value).topping, e.target.checked)}
                />{topping.topping.name}
              </div>)
            )}
            </div>
          );
        }}
      </Query>
    }
  </div>
)

const mapStateToProps = ({ form }) => ({
  size: form.size.name,
  selectedToppings: form.toppings.map(topping => topping.name),
  maxToppings: form.size.maxToppings
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleTopping,
      updateDefaultToppings
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toppings)
