import React from 'react';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { products } = this.props;

    // if (products === []) return (<p>Produto não encontrado!</p>);

    return (
      <div>

        {products.map(({ title, price, thumbnail, id }) => (
          <div data-testid="product" key={ id }>
            <img src={ thumbnail } alt={ title } />
            <h2>{title}</h2>
            <h3>{price}</h3>
          </div>))}
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
};

Products.defaultProps = {
  products: undefined,
};

export default Products;
