import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const carrinho = { // criei um objeto crrinho ao invés de um array, agora cada chave tem itens repetidos e únicos respectivamente
  itens: [],
  noRepeatedItens: [],
}; // mudança de array para objeto;

class Products extends React.Component {
  addToCart = (product) => {
    carrinho.itens.push(product);
    carrinho.noRepeatedItens = [...new Set(carrinho.itens)]; // cria um array com elementos únicos
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  render() {
    const { products } = this.props;
    if (products.length === 0) return <p>Produto não encontrado!</p>;
    return (
      <main>
        <div className="products-container">
          {products.map((product) => (
            <div
              key={ product.id }
            >
              <Link // alterei o componente e adicionei um Link envelopando toda a div
                data-testid="product-detail-link"
                to={ `product/${product.category_id}/${product.id}` }
              >
                <div
                  data-testid="product"
                >
                  <img src={ product.thumbnail } alt={ product.title } />
                  <h2>{product.title}</h2>
                  <h3>{product.price}</h3>
                </div>
              </Link>
              <button
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(product) }
                type="button"
              >
                Adicionar item ao carrinho
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
};

Products.defaultProps = {
  products: undefined,
};

export default Products;
