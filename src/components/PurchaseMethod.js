import React from 'react';
import './PurchaseMethod.css';

class PurchaseMethod extends React.Component {
  render() {
    return (
      <div
        className="payment"
      >
        <h2>Método de Pagamento</h2>
        <label htmlFor="boleto">
          <input type="radio" name="payment-method" id="boleto" />
          Boleto
        </label>
        <label htmlFor="visa">
          <input type="radio" name="payment-method" id="visa" />
          Visa
        </label>
        <label htmlFor="masterCard">
          <input type="radio" name="payment-method" id="masterCard" />
          MasterCard
        </label>
        <label htmlFor="elo">
          <input type="radio" name="payment-method" id="elo" />
          Elo
        </label>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}

export default PurchaseMethod;
