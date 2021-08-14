import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

class CartPage extends React.Component {
  constructor() {
    super();
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      const { itens, noRepeatedItens } = carrinho;
      // criei essa constante que busca os itens adicionados no localStorage
      this.state = {
        carts: itens,
        uniqueCarts: noRepeatedItens,
      };
    } else {
      this.state = {
        carts: [],
        uniqueCarts: [],
      };
    }
  }

  addItem = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const { itens } = carrinho;
    const item = itens.find((element) => element.id === product.id);
    itens.push(item);
    this.setState({ carts: itens });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  removeItem = (product) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const { itens } = carrinho;
    const item = itens.find((element) => element.id === product.id);
    const index = itens.indexOf(item);
    itens.splice(index, 1);
    this.setState({ carts: itens });
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
      <div className="products">
        {uniqueCarts.map((product) => (
          <div
            className="product-detail"
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
            <h3>{`R$${product.price}`}</h3>
            <div className="buttons">
              <button
                data-testid="product-increase-quantity"
                onClick={ () => this.addItem(product) }
                type="button"
                disabled={ carts
                  .filter((el) => el.id === product.id).length
                  >= product.available_quantity }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeItem(product) }
                type="button"
                disabled={ carts
                  .filter((el) => el.id === product.id).length === 1 }
              >
                -
              </button>
            </div>
          </div>))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

export default CartPage;
