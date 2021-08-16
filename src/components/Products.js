import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const carrinho = { // criei um objeto crrinho ao invés de um array, agora cada chave tem itens repetidos e únicos respectivamente
  itens: [],
  noRepeatedItens: [],
}; // mudança de array para objeto;

class Products extends React.Component {
  addToCart = (product, callback) => {
    const { itens } = carrinho;
    itens.push(product);
    carrinho.noRepeatedItens = [...new Set(carrinho.itens)]; // cria um array com elementos únicos
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.setState({
    });
    callback();
  }

  render() {
    const freeShipping = <p data-testid="free-shipping">Frete grátis!</p>;
    const { products, onClick, quantity } = this.props;
    if (products.length === 0) return <p>Produto não encontrado!</p>;
    return (
      <section className="products-container">
        {products.map((product) => (
          <div
            className="product"
            key={ product.id }
          >
            <Link // alterei o componente e adicionei um Link envelopando toda a div
              quantity={ quantity }
              data-testid="product-detail-link"
              to={ `product/${product.category_id}/${product.id}` }
            >
              <div
                className="link-container"
                data-testid="product"
              >
                <h2>
                  {product.title}
                </h2>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <h3>
                  {`R$ ${product.price}`}
                </h3>
              </div>
            </Link>
            {product.shipping.free_shipping && freeShipping}
            <button
              data-testid="product-add-to-cart"
              onClick={ () => this.addToCart(product, onClick) }
              type="button"
            >
              Adicionar item ao carrinho
            </button>
          </div>
        ))}
      </section>
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
  onClick: (PropTypes.func).isRequired,
  quantity: (PropTypes.number).isRequired,
};

Products.defaultProps = {
  products: undefined,
};

export default Products;
