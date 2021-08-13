// requisito 4;
import React from 'react';
import PropTypes from 'prop-types';
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

  async getCategories() {
    // resolvi transformar em uma função async/await, e rodar a function no componentDidMount
    const categories = await api.getCategories().then((cats) => cats);
    await this.setState({ loading: false, category: categories });
  }

  render() {
    const { category, loading } = this.state;
    const { handleCategory } = this.props; // props que recebe a função handle, para atualizar o estado do componente MainPage.

    if (loading) {
      return <p>Carregando...</p>;
    }

    return (
      <ul>
        {category
          .map(({ id, name }) => (
            <li
              className="category"
              key={ id }
            >
              <button // lista de botões
                type="button"
                key={ id }
                value={ id }
                onClick={ handleCategory }
                data-testid="category"
              >
                { name }
              </button>
            </li>
          ))}
      </ul>
    );
  }
}

Category.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};

export default Category;
