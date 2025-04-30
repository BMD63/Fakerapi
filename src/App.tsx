import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // Импортируем PrivateRoute
import Feedback from './components/Feedback'; // Импортируем Feedback
import PersonalAccount from './components/PersonalAccount'; 

function App() {
  return (
    
    <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
            <li>
              <Link to="/feedback">Обратная связь</Link>
            </li>
            <li>
              <Link to="/personal-account">Личный кабинет</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/personal-account" element={<PrivateRoute><PersonalAccount /></PrivateRoute>} />          <Route path="*" element={<h1>404 Not Found</h1>} /> Добавляем обработку несуществующих маршрутов
        </Routes>
    </Router>
  );
}

export default App;