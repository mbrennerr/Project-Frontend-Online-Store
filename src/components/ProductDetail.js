import React from 'react';
import './ProductDetail.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import * as Products from './Products';
import FormEvaluation from './FormEvaluation';
import ReviewList from './ReviewList';

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
    this.ckeckLocalStorage();
  }

  ckeckLocalStorage = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      const { itens } = carrinho;
      this.setState({
        quantity: itens.length,
      });
    } else {
      this.setState({
        quantity: 0,
      });
    }
  }

   addToCart = (product) => {
     Products.carrinho.itens.push(product);
     if (Products.carrinho.noRepeatedItens
       .every((element) => element.id !== product.id)) { // verifica se já existe o produto na chave carrinho.noRepeatedItens
       Products.carrinho.noRepeatedItens = [...new Set(Products.carrinho.itens)];
     }
     localStorage.setItem('carrinho', JSON.stringify(Products.carrinho)); // atualizo localStorage
     this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
   }

  fetchProduct = async () => {
    const search = localStorage.getItem('search');
    const { match: { params: { category_id: categoryId, id } } } = this.props;
    const product = await api.getProductsFromCategoryAndQuery(categoryId, search)
      .then(({ results }) => results.find((prod) => prod.id === id));
    this.setState({
      loading: false,
      product,
    });
  }

  render() {
    const { product, loading, quantity } = this.state;
    if (loading) {
      return (
        <h1>loading...</h1>
      );
    }
    return (
      <div
        className="product-container"
      >
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
          R$
          { product.price }
        </h2>
        <div>
          { product.mercadoPago && <h2> Aceita Mercado Pago! </h2>}
        </div>
        <div
          className="button-cartLink-container"
        >
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(product) }
            type="button"
          >
            Adicionar item ao carrinho
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            Visitar carrinho
            <h2
              data-testid="shopping-cart-size"
            >
              { quantity }
            </h2>
          </Link>
          {product.freeShipping && <h2>Frete grátis!</h2>}
        </div>
        <FormEvaluation id={ product.id } />
        <ReviewList id={ product.id } />
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
