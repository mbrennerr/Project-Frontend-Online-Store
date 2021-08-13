import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';
import ProductDetails from './components/ProductDetail';
import PurchasePage from './components/PurchasePage';
import CartPage from './components/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ MainPage } />
      <Route exact path="/cart" component={ CartPage } />
      <Route exact path="/checkout" component={ PurchasePage } />
      <Route
        exact
        path="/product/:category_id/:id"
        render={ (props) => <ProductDetails { ...props } /> }
      />
    </BrowserRouter>
  );
}

export default App;
