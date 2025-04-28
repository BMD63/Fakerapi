import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import LoginPage from './components/LoginPage';
function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/products/1">Product 1</Link>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
