import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import LoginPage from './components/LoginPage';
import Feedback from './components/Feedback'; // Импортируем Feedback
import PersonalAccount from './components/PersonalAccount'; 
import styles from './App.module.scss'; 
import React, {useState} from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;};
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <Router>
      <div className={styles.appContainer}>
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Главная</Link>
            </li>
            <li className={styles.navItem}>
            <button onClick={openLoginModal} className={styles.navLinkButton}>Войти</button>
            </li>
            <li className={styles.navItem}>
              <Link to="/feedback" className={styles.navLink}>Обратная связь</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/personal-account" className={styles.navLink}>Личный кабинет</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/personal-account" element={<ProtectedRoute><PersonalAccount /></ProtectedRoute>} />          <Route path="*" element={<h1>404 Not Found</h1>} /> Добавляем обработку несуществующих маршрутов
          </Routes>
          {isLoginModalOpen && <LoginPage onClose={closeLoginModal} />}
          </div>
        </div>
    </Router>
    


  );
}

export default App;