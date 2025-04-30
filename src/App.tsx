import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // Импортируем PrivateRoute
import Feedback from './components/Feedback'; // Импортируем Feedback
import PersonalAccount from './components/PersonalAccount'; 
import styles from './App.module.scss'; 

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/">Главная</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/login">Войти</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/feedback">Обратная связь</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/personal-account">Личный кабинет</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/personal-account" element={<PrivateRoute><PersonalAccount /></PrivateRoute>} />          <Route path="*" element={<h1>404 Not Found</h1>} /> Добавляем обработку несуществующих маршрутов
          </Routes>
          </div>
        </div>
    </Router>
    


  );
}

export default App;