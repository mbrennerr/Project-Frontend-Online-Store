import React from 'react';

class CartPage extends React.Component {
  constructor() {
    super();

    if (localStorage.getItem('carrinho') === null) {
      this.state = {
        carts: [],
        uniqueCarts: [],
      };
    } else {
      console.log(localStorage.getItem('carrinho'));
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      console.log(carrinho);
      // criei essa constante que busca os itens adicionados no localStorage
      this.state = {
        carts: carrinho.itens,
        uniqueCarts: carrinho.noRepeatedItens,
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
    if (uniqueCarts.length === 0) return emptyElement; // modifiquei a condição pois o estado agora é um array
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
              data-testid="shopping-cart-product-quantity"
            >
              Quantidade:
              {carts.filter((element) => element.id === product.id).length}
            </h2>
            <h3>{product.price}</h3>
          </div>))}
      </div>
    );
  }
}

export default CartPage;
