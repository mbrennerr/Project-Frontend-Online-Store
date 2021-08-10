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
    this.getCategories();
  }

  async getCategories() { // resolvi transformar em uma função async/await, e rodar a function no componentDidMount
    const categories = await api.getCategories().then((cats) => cats);
    await this.setState({ loading: false, category: categories });
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
