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
    const { match: { params: { id } } } = this.props;
    const { location:
            { state: { product: { category_id: categoryId, title } } } } = this.props;

    const product = await api.getProductsFromCategoryAndQuery(categoryId, title)
      .then(({ results }) => results.find((prod) => prod.id === id));
    await this.setState({
      loading: false,
      product,
    });
  }

  render() {
    const { loading } = this.state;
    const { product } = this.props.location.state;
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
      <div>
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
        <div>
          { mercadoPago && <h2> Aceita Mercado Pago! </h2>}
        </div>
        <div>
          {freeShipping && <h2>Frete grátis!</h2>}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        title: PropTypes.string,
        category_id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ProductDetails;
