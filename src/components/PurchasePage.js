import React from 'react';
import './PurchasePage.css';
import PurchaseMethod from './PurchaseMethod';
import PurchaseForms from './PurchaseForms';

class PurchasePage extends React.Component {
  render() {
    const notFound = <h2>Compras não encontradas</h2>;
    if (localStorage) {
      const { itens } = JSON.parse(localStorage.getItem('carrinho'));
      return (
        <section className="container-checkout">
          <h2>Revise seus produtos</h2>
          <div
            className="products-list"
          >
            {itens.map((item, i) => (
              <div
                className="product"
                key={ i }
              >
                <img src={ item.thumbnail } alt={ item.title } />
                <p>
                  R$
                  {` ${item.price}`}
                </p>
              </div>
            ))}
          </div>
          <div
            className="total-price"
          >
            <h2>
              Total: R$
              {' '}
              {itens.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)}
            </h2>
          </div>
          <PurchaseForms />
          <PurchaseMethod />
        </section>
      );
    } return notFound;
  }
}

export default PurchasePage;
