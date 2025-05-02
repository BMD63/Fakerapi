import {Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для роута на логин
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const navigate = useNavigate(); // Используем useNavigate для редиректа на страницу входа
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    // navigate('/');    // если нужно будет, можно добавить логику для перенаправления
    setIsLoginModalOpen(false);
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    closeLoginModal();
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };
  console.log(isLoggedIn);
  console.log(localStorage.getItem('isLoggedIn'));
  console.log(isLoginModalOpen);
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