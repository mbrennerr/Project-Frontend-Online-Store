import React from 'react';
import PropTypes from 'prop-types';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfReviews: undefined,
    };
  }

  componentDidMount() {
    this.mountReviews();
  }

  mountReviews = () => {
    const { id } = this.props;

    if (!localStorage.getItem(id)) {
      return undefined;
    }

    const reviews = JSON.parse(localStorage[id]);

    const renderList = reviews.map((r, index) => (
      <div key={ index }>
        <p>{r.nome}</p>
        <p>{ r.email }</p>
        <p>{ r.comentario }</p>
      </div>
    ));

    this.setState({ listOfReviews: renderList });
  }

  render() {
    const { listOfReviews } = this.state;
    console.log(listOfReviews);
    return (
      <div>
        { !listOfReviews ? <span>Sem Avaliações</span>
          : listOfReviews }
      </div>
    );
  }
}

ReviewList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReviewList;
