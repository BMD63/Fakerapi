import React from 'react'  
import {useForm, SubmitHandler} from 'react-hook-form'
import styles from './LoginPage.module.scss' 
import { useNavigate } from 'react-router-dom'
import { LoginFormValues, LoginPageProps } from '../types/login'  
import { FaTimes } from 'react-icons/fa'
import { TEST_CREDENTIALS } from '../constants'

const LoginPage: React.FC<LoginPageProps> = ({onClose, onLoginSuccess}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<LoginFormValues> = data => {
        if (data.login === TEST_CREDENTIALS.login && data.password === TEST_CREDENTIALS.password) {
            localStorage.setItem('isLoggedIn', 'true');
            onLoginSuccess()
            onClose();
            navigate('/personal-account');
        } else {
            alert('Неверные учетные данные');
        }
        console.log(data);
    };
    return (
            <div className={styles.modalOverlay} onClick={onClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FaTimes />
                    </button>
                <h2 className={styles.loginTitle}>Вход</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="login">Логин:</label>
                        <input
                            type="text"
                            id="login"
                            autoComplete="off" 
                            className = {styles.input}
                            {...register("login", { required: "Логин обязателен" })}
                        />
                        {errors.login && <span className={styles.errorMessage}>{errors.login.message}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off" 
                            className = {styles.input}
                            {...register("password", { required: "Пароль обязателен" })}
                        />
                        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
                    </div>
                    <button type="submit" className={styles.loginButton}>Войти</button>
                </form>
                 </div>
            </div>
    )
}
export default LoginPage