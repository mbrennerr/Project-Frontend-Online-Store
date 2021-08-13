import React from 'react';
import PropTypes from 'prop-types';

class FormEvaluation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comentario: '',
      email: '',
      nome: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { id } = this.props; // recebemos o ID do produto para adicionar ao key do localStorage;
    const { comentario, email, nome } = this.state;

    const reviewProduct = { comentario, email, nome }; // 1- joga o state nesse obj.

    /*     console.log(reviewProduct); */

    if (localStorage[id]) { // se já existir um localStorage esse ID de produto:
      const reviewArray = JSON.parse(localStorage[id]);
      localStorage[id] = JSON.stringify([...reviewArray, reviewProduct]); // adiciona o state atual ao final do localStorage
    } else { // se não exitir:
      localStorage[id] = JSON.stringify([reviewProduct]); // adiciona o state atual ao local storage
    }
  }

  render() {
    const { comentario, nome, email } = this.state;
    return (
      <div>
        <form className="forms" onSubmit={ this.handleSubmit }>
          <label htmlFor="name-input">
            nome:
            <input
              id="name-input"
              type="text"
              value={ nome }
              name="nome"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            email:
            <input
              id="email-input"
              type="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-text-area">
            comentário:
            <textarea
              id="input-text-area"
              placeholder="adicione seu comentário (opcional)"
              data-testid="product-detail-evaluation"
              value={ comentario }
              onChange={ this.handleChange }
              name="comentario"
              cols="30"
              rows="10"
            />
          </label>
          <button type="submit">enviar</button>
        </form>
      </div>
    );
  }
}

FormEvaluation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormEvaluation;
