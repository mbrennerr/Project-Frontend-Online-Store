import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';
import CartPage from './components/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ MainPage } />
      <Route exact path="/cart" component={ CartPage } />
    </BrowserRouter>
  );
}

export default App;
