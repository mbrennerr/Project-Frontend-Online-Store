import React from 'react';
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
    const product = await api.getProductsFromId(id);
    await this.setState({
      loading: false,
      product,
    });
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

export default ProductDetails;
