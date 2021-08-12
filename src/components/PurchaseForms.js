import React from 'react';

class PurchaseForms extends React.Component {
  render() {
    const estates = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
      'SC', 'SP', 'SE', 'TO'];
    return (

      <form>
        <h2>Informações do comprador</h2>
        <input type="text" data-testid="checkout-fullname" placeholder="Nome Completo" />
        <input type="text" data-testid="checkout-cpf" placeholder="CPF" />
        <input type="email" data-testid="checkout-email" placeholder="Email" />
        <input type="text" data-testid="checkout-phone" placeholder="Telefone" />
        <input type="text" data-testid="checkout-cep" placeholder="CEP" />
        <input type="text" data-testid="checkout-address" placeholder="Endereço" />
        <input type="text" placeholder="Complemento" />
        <input type="text" placeholder="Número" />
        <input type="text" placeholder="Cidade" />
        <select name="" id="" placeholder="Estado">
          {estates.map((estate) => (
            <option
              key={ estate }
              value={ estate }
            >
              {estate}
            </option>))}
        </select>
        <button type="button">Finalizar Compra</button>
      </form>

    );
  }
}

export default PurchaseForms;
