import React from 'react';

class CartPage extends React.Component {
  constructor() {
    super();

    const cartItens = JSON.parse(localStorage.getItem('itens'));
    const uniqueCartItens = JSON.parse(localStorage.getItem('noRepeatedItens'));

    if (localStorage) {
      this.state = {
        carts: cartItens,
        uniqueCarts: uniqueCartItens,
      };
    } else {
      this.state = {
        carts: [],
        uniqueCarts: [],
      };
    }
  }

  render() {
    const { uniqueCarts } = this.state;
    // const emptyElement = <p data-testid="shopping-cart-empty-message">
    //  Seu carrinho está vazio
    //  </p>
    return (
      <div className="products-container">
        {uniqueCarts.map((product) => (
          <div
            key={ product.id }
          >
            <img src={ product.thumbnail } alt={ product.title } />
            <h2>{product.title}</h2>
            <h2>Quantidade: </h2>
            <h3>{product.price}</h3>
          </div>))}
      </div>
    );
  }
}

export default CartPage;
