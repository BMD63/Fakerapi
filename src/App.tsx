import {Routes, Route, Link, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'; 
import HomePage from './components/HomePage/HomePage';
import ProductDetailPage from './components/ProductDetail/ProductDetailPage';
import LoginPage from './components/Login/LoginPage';
import Feedback from './components/Feedback/Feedback';
import PersonalAccount from './components/PersonalAccount/PersonalAccount'; 
import styles from './App.module.scss'; 
import React, {useState} from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    // navigate('/');    // если нужно будет, можно добавить логику для перенаправления
    setIsLoginModalOpen(false);
  };
  // обработка успешного входа
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    closeLoginModal();
  };
  // выход из аккаунта
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    if (location.pathname === '/personal-account') {
      navigate('/'); // Перенаправляем только если мы на странице личного кабинета
    }
  };
  return (
      <div className={styles.appContainer}>
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Главная</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/feedback" className={styles.navLink}>Обратная связь</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/personal-account" className={styles.navLink}>Личный кабинет</Link>
            </li>
            {!isLoggedIn ? (<li className={styles.navItem}>
            <button onClick={openLoginModal} className={styles.navLinkButton}>Войти</button>
            </li>
            ) : (
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.navLinkButton}>Выйти</button>
              </li>
            )}
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* если нужен редирект на страницу входа */}
             {/* <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} onClose={closeLoginModal} />}
            /> */}
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/personal-account" element={<ProtectedRoute><PersonalAccount onLoginOut={handleLogout} /></ProtectedRoute>} />          
            <Route path="*" element={<h1>404 Not Found</h1>} /> // Роут для обработку несуществующих маршрутов
          </Routes>
          {isLoginModalOpen && <LoginPage onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />}
          </div>
        </div>
    


  );
}

export default App;