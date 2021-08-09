// requisito 2
import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

class MainPage extends React.Component {
  render() {
    return (
      <>
        <div>
          <Category />
        </div>
        <div>
          <label htmlFor="search">
            <input type="text" id="search" />
          </label>
          <Link to="/cart" data-testid="shopping-cart-button" />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </>
    );
  }
}
export default MainPage;
