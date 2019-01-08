import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateSize } from '../reducers/form'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_PIZZA_SIZES = gql`
  {
    pizzaSizes {
      name,
      basePrice,
      maxToppings
    }
  }
`;

const PizzaSizes = ({ updateSize, selectedSize }) => (
  <Query query={GET_PIZZA_SIZES}>
    {({ data: { pizzaSizes }, loading }) => {
      if (loading || !pizzaSizes) {
        return <div>Loading ...</div>;
      }

      return (
        <div>
          <h1>Pizza Sizes</h1>
          {pizzaSizes.map(size => (
            <div key={size.name}>
              <input
                type="radio"
                name="size"
                value={JSON.stringify(size)}
                checked={selectedSize === size.name}
                onChange={(e) => updateSize(JSON.parse(e.target.value))}
              />{size.name}
            </div> )
          )}
        </div>
      );
    }}
  </Query>
)

const mapStateToProps = ({ form }) => ({
  selectedSize: form.size.name
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateSize },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaSizes)
