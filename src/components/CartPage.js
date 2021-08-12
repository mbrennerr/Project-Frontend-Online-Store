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
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      // criei essa constante que busca os itens adicionados no localStorage
      this.state = {
        carts: carrinho.itens,
        uniqueCarts: carrinho.noRepeatedItens,
      };
    }
  }

  addItem = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const item = carrinho.itens.find((element) => element.id === product.id);
    carrinho.itens.push(item);
    this.setState({
      carts: carrinho.itens,
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
  // rrr

  removeItem = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const quantity = carrinho.itens.filter((element) => element.id === product.id).length;
    const item = carrinho.itens.find((element) => element.id === product.id);
    const index = carrinho.itens.indexOf(item);
    if (quantity >= 2) carrinho.itens.splice(index, 1);
    this.setState({
      carts: carrinho.itens,
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
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
            <div className="buttons">
              <button
                data-testid="product-increase-quantity"
                onClick={ () => this.addItem(product) }
                type="button"
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeItem(product) }
                type="button"
              >
                -
              </button>
            </div>
          </div>))}
      </div>
    );
  }
}

export default CartPage;
