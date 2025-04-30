import React from 'react'  
import {useForm, SubmitHandler} from 'react-hook-form'
import styles from './LoginPage.module.scss' 
import { LoginFormValues } from '../types/login'  
const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const onSubmit: SubmitHandler<LoginFormValues> = data => {
        console.log(data);
    };
    return (
            <div className={styles.loginContainer}>
                <h2 className={styles.loginTitle}>Вход</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            className = {styles.input}
                            {...register("password", { required: "Пароль обязателен" })}
                        />
                        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
                    </div>
                    <button type="submit" className={styles.loginButton}>Войти</button>
                </form>
                 
            </div>
    )
}
export default LoginPage