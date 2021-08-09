// requisito 4;
import React from 'react';
import * as api from '../services/api';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      loading: true,
    };
  }

  componentDidMount() {
    api.getCategories().then((data) => {
      this.setState({
        loading: false,
        category: data,
      });
    });
  }

  render() {
    const { category, loading } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <ul className="category">
        {category
          .map(({ id, name }) => <li key={ id } data-testid="category">{ name }</li>)}
      </ul>
    );
  }
}

export default Category;
