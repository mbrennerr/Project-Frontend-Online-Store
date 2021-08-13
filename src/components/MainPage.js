import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import './MainPage.css';
import Products from './Products';
import * as api from '../services/api';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      itemSearched: '',
      products: [],
      search: false,
      category: '',
    };
  }

  fetchProducts = async () => {
    const { itemSearched, category } = this.state;
    api.getProductsFromCategoryAndQuery(category, itemSearched)
      .then(({ results }) => this.setState({
        products: results,
        search: true,
      }));
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      itemSearched: value,
    });
  }

  handleCategory = async ({ target }) => {
    // função handle da categoria, troca o estado de category.
    const { value } = target;
    await this.setState({ category: value });
    await this.fetchProducts();
    // this.setState({ category: value }, () => this.fetchProducts);
  }

  render() {
    const { itemSearched, products, search } = this.state;
    const warning = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>);
    return (
      <main>
        <div className="categories">
          <Category handleCategory={ this.handleCategory } />
        </div>
        <section className="main-page">
          <div className="empty-cart">
            {!itemSearched && products.length < 1 && warning}
          </div>
          <div className="search">
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
          </div>
          {search && <Products products={ products } />}
        </section>
      </main>
    );
  }
}

export default MainPage;
