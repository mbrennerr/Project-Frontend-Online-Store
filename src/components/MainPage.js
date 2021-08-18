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

  componentDidMount() {
    this.cartItens();
  }

  componentWillUnmount() {
    // antes do componente ser desmontado, salvamos o $QUERY que utilizamos;
    const { itemSearched } = this.state;
    localStorage.setItem('search', itemSearched);
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

  cartItens = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      const { itens } = carrinho;
      this.setState({ quantity: itens.length });
    } else {
      this.setState({ quantity: 0 });
    }
  }

  render() {
    const { itemSearched, products, search, quantity } = this.state;
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
              <h2
                data-testid="shopping-cart-size"
              >
                { quantity }
              </h2>
            </Link>
          </div>
          {search && <Products
            quantity={ quantity }
            onClick={ this.cartItens }
            products={ products }
          />}
        </section>
      </main>
    );
  }
}

export default MainPage;
