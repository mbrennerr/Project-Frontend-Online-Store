import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  render() {
    const { products } = this.props;

    if (products.length === 0) return <p>Produto não encontrado!</p>;

    return (
      <div>
        {products.map(({ title, price, thumbnail, id }) => (
          <Link // alterei o componente e adicionei um Link envelopando toda a div
            data-testid="product-detail-link"
            to={ `/${id}` }
            key={ id }
          >
            <div
              data-testid="product"
            >
              <img src={ thumbnail } alt={ title } />
              <h2>{title}</h2>
              <h3>{price}</h3>
            </div>
          </Link>))}
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
