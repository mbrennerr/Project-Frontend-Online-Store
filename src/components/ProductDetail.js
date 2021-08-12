import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: {},
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { category_id: categoryId, id } } } = this.props;
    const product = await api.getProductsFromCategoryAndQuery(categoryId, '')
      .then(({ results }) => results.find((prod) => prod.id === id));
    this.setState({
      loading: false,
      product,
    });
  }

  render() {
    const { loading } = this.state;
    const { product } = this.state;
    if (loading) {
      return (
        <h1>loading...</h1>
      );
    }

    return (
      <div>
        <h1
          data-testid="product-detail-name"
        >
          { product.title }
        </h1>
        <img src={ product.thumbnail } alt={ product.title } />
        <h2>
          { product.quantity }
        </h2>
        <h2>
          { product.price }
        </h2>
        <div>
          { product.mercadoPago && <h2> Aceita Mercado Pago! </h2>}
        </div>
        <div>
          {product.freeShipping && <h2>Frete grátis!</h2>}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      category_id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
