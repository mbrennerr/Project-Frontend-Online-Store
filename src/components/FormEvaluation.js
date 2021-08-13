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

  handleSubmit = (e) => {
    const { id } = this.props;
    const { comentario, email, nome } = this.state;

    const reviewProduct = { comentario, email, nome };

    /*     console.log(reviewProduct); */

    /* e.preventDefault(); */

    if (localStorage[id]) {
      console.log(localStorage[id]);
      const reviewArray = JSON.parse(localStorage[id]);
      console.log(reviewArray);
      /* const filteredReviews = reviewArray.filter((r) => {
        if (r.email === reviewProduct.id) {
          return false;
        }
        return true;
      });
      console.log(filteredReviews); */
      localStorage[id] = JSON.stringify([...reviewArray, reviewProduct]);
    } else {
      localStorage[id] = JSON.stringify([reviewProduct]);
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
