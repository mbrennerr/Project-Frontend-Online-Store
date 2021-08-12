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

  /* fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductsFromId(id);
    await this.setState({
      loading: false,
      product,
    });
  } */

  fetchProduct = async () => {
    const { match: { params: { id, category } } } = this.props;
    const product = await api.getProductsFromCategoryAndQuery(category, '')
      .then(({ results }) => results.find((item) => item.id === id));
    await this.setState({ product, loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <h1>loading...</h1>
      );
    }

    const { product: { title,
      thumbnail,
      available_quantity: quantity,
      accepts_mercadopago: mercadoPago,
      price,
      shipping: { free_shipping: freeShipping } } } = this.state;

    return (
      <div className="product-detail">
        <h1
          data-testid="product-detail-name"
        >
          { title }
        </h1>
        <img src={ thumbnail } alt={ title } />
        <h2>
          { quantity }
        </h2>
        <h2>
          { price }
        </h2>
        <h2>
          { mercadoPago && <h2> Aceita Mercado Pago! </h2>}
        </h2>
        <h2>
          {freeShipping && <h2>Frete grátis!</h2>}
        </h2>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
    }),
  }),
};

ProductDetails.defaultProps = {
  match: {},
};

export default ProductDetails;
