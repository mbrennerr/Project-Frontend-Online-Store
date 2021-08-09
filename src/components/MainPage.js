// requisito 2
import React from 'react';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="search">
          <input type="text" id="search" />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
export default MainPage;
