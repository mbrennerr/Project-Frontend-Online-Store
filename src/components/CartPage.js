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
    const { uniqueCarts, carts } = this.state;
    const emptyElement = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    );
    if (!uniqueCarts) return emptyElement;
    return (
      <div className="products-container">
        {uniqueCarts.map((product) => (
          <div
            key={ product.id }
          >
            <img src={ product.thumbnail } alt={ product.title } />
            <h2
              data-testid="shopping-cart-product-name"
            >
              {product.title}
            </h2>
            <h2
              data-testid="shopping-cart-product-quantit"
            >
              Quantidade:
              { carts.filter((element) => element.id === product.id).length }
            </h2>
            <h3>{product.price}</h3>
          </div>))}
      </div>
    );
  }
}

export default CartPage;
