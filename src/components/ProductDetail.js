import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import * as Products from './Products';

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

   addToCart = (product) => {
     if (localStorage.getItem('carrinho') === null) { // verifica se ja existe item adicionado ao carrinho
       Products.carrinho.itens.push(product); // adiciona o item no array carrinho do component Products
       Products.carrinho.noRepeatedItens = [...new Set(Products.carrinho.itens)];
       localStorage.setItem('carrinho', JSON.stringify(Products.carrinho));
     } else {
       Products.carrinho.itens.push(product);
       if (!Products.carrinho.noRepeatedItens
         .some((element) => element.id === product.id)) { // verifica se já existe o produto na chave carrinho.noRepeatedItens
         Products.carrinho.noRepeatedItens = [...new Set(Products.carrinho.itens)];
       }
       localStorage.setItem('carrinho', JSON.stringify(Products.carrinho)); // atualizo localStorage
     }
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
    const { product } = this.state;
    const freeShippingElement = (
      <h2
        data-testid="free-shipping"
      >
        Frete grátis!
      </h2>
    );
    return (
      <main>
        <div className="product-detail">
          <h1
            data-testid="product-detail-name"
          >
            {title}
          </h1>
          <img src={ thumbnail } alt={ title } />
          <h2>
            {quantity}
          </h2>
          <h2>
            {price}
          </h2>
          {mercadoPago && <h2> Aceita Mercado Pago! </h2>}
          {freeShipping && freeShippingElement }
        </div>
        <div>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(product) }
            type="button"
          >
            Adicionar item ao carrinho
          </button>
        </div>
      </main>
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
