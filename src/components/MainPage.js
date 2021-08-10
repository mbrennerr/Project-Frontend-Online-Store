import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import './MainPage.css';

class MainPage extends React.Component {
  render() {
    return (
      <main>
        <div className="categorias">
          <Category />
        </div>
        <div className="pesquisa">
          <label htmlFor="search">
            <input type="text" id="search" />
          </label>
          <Link to="/cart" data-testid="shopping-cart-button">
            Visitar carrinho
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </main>
    );
  }
}
export default MainPage;
