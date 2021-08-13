import React from 'react';
import PurchaseMethod from './PurchaseMethod';
import PurchaseForms from './PurchaseForms';

class PurchasePage extends React.Component {
  render() {
    const notFound = <h2>Compras não encontradas</h2>;
    if (localStorage) {
      const { itens } = JSON.parse(localStorage.getItem('carrinho'));
      return (
        <section className="container-checkout">
          <div>
            <h2>Revise seus produtos</h2>
            {itens.map((item, i) => (
              <div key={ i }>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>
                  R$
                  {` ${item.price}`}
                </p>
              </div>
            ))}
            <h2>
              Total:
              {' '}
              {itens.reduce((acc, item) => acc + Number(item.price), 0)}
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
