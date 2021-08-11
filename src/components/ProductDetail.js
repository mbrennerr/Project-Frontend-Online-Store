import React from 'react';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  render() {
    return (
      <div className="product-detail">
        <h1
          data-testid="product-detail-name"
        >
          { name }
        </h1>
        <img src={ thumbnail } alt={ name } />
        <h2>
          { available_quantity }
        </h2>
        <h2>
          { price }
        </h2>
        <h2>
          { accepts_mercadopago && <h2> Aceita Mercado Pago! </h2>}
        </h2>
      </div>
    );
  }
}
//
export default ProductDetails;
