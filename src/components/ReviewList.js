import React from 'react';
import PropTypes from 'prop-types';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfReviews: undefined,
    };
  }

  componentDidMount() { // monta o comentário assim q o componente é montado (sempre que dá o Submit do forms d(^_^) ).
    this.mountReviews();
  }

  mountReviews = () => {
    const { id } = this.props; // recebe o ID do produto para saber qual localStorage será acessada e montada;

    if (!localStorage.getItem(id)) { // se não existir review...
      return undefined;
    }

    const reviews = JSON.parse(localStorage[id]); // se existir, transforma o objeto 'stringficado em Json para ser usado'

    const renderList = reviews.map((r, index) => ( // faz um map para montagem dos comentários ^^ .
      <div key={ index }>
        <p>{r.nome}</p>
        <p>{ r.email }</p>
        <p>{ r.comentario }</p>
      </div>
    )); // falta estilizar...

    this.setState({ listOfReviews: renderList }); // adiciona os comentários no state atual.
  }

  render() {
    const { listOfReviews } = this.state;

    return (
      <div>
        { !listOfReviews ? <span>Sem Avaliações</span> // undefined = falsy!
          : listOfReviews }
      </div>
    );
  }
}

ReviewList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReviewList;
