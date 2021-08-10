import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import './MainPage.css';
import * as api from '../services/api';
import Products from './Products';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      itemSearched: '',
      products: [],
    };
  }

  fetchProducts = async () => {
    const { itemSearched, products } = this.state;
    api.getProductsFromCategoryAndQuery('', itemSearched)
      .then(({ results }) => this.setState({
        products: results,
      }));
    console.log(products);
  };

  handleChange = (e) => {
    this.setState({
      itemSearched: e.target.value,
    });
  }

  render() {
    const { itemSearched, products } = this.state;

    return (
      <main>
        <div className="categorias">
          <Category />
        </div>
        <div className="pesquisa">
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              data-testid="query-input"
              value={ itemSearched }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.fetchProducts }
          >
            Pesquisar item
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            Visitar carrinho
          </Link>
          <Products products={ products } />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </main>
    );
  }
}
export default MainPage;
