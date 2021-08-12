import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

    const { product } = this.state;
    const freeShippingElement = (
      <h2
        data-testid="free-shipping"
      >
        Frete grátis!
      </h2>
    );

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
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(product) }
            type="button"
          >
            Adicionar item ao carrinho
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            Visitar carrinho
          </Link>
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
