import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';
import CartPage from './components/CartPage';
import ProductDetails from './components/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ MainPage } />
      <Route exact path="/cart" component={ CartPage } />
      <Route
        exact
        path="/product/:id"
        render={ (props) => <ProductDetails { ...props } /> }
      />
    </BrowserRouter>
  );
}

export default App;
