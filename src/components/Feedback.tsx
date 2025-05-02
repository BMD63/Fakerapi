import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {FaTimes} from 'react-icons/fa'
import { useGetPersonQuery } from '../services/personsApi'
import { FeedbackFormModal } from '../types/feedback'
import {
    setFio,
    setPhone,
    setEmail,
    setDate,
    setComment,
    resetForm,
    selectFeedbackForm,
} from './feedbackFormSlice'
import styles from './Feedback.module.scss'

type FeedbackFormProps = object
const Feedback : React.FC<FeedbackFormProps> = () => {
    const { fio, phone, email, date, comment } = useAppSelector(selectFeedbackForm)
    const dispatch = useAppDispatch()
    // проверка авторизации
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true'); 
    const {data : userData, isFetching, isSuccess, isError, error} = useGetPersonQuery(undefined, {skip: !isLoggedIn})
    useEffect(() => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'isLoggedIn') {
          setIsLoggedIn(event.newValue === 'true');
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      // Очистка слушателя при размонтировании компонента
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []); 
        // стейт модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formDataForModal, setFormDataForModal] = useState<FeedbackFormModal|null>(null);
        // состояния для ошибок для валидации формы
    const [fioError, setFioError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [commentError, setCommentError] = useState('');
    
    // обработчики событий для изменения состояния формы
    
    const handleFioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFio(e.target.value));
        setFioError('');
      }, [dispatch]);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPhone(e.target.value))
    }
    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(e.target.value));
        setEmailError('');
      }, [dispatch]);

    const handleDateChange = useCallback((newDate: Date | null) => {
        dispatch(setDate(newDate));
        setDateError('');
      }, [dispatch]);
    
    const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setComment(e.target.value));
        setCommentError('');
      }, [dispatch]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        let isValid = true;
        if (!fio.trim()) {
          setFioError('Пожалуйста, введите ФИО.');
          isValid = false;
        }
        if (!phone.trim()) {
          setPhoneError('Пожалуйста, введите номер телефона.');
          isValid = false;
        }
        if (!email.trim()) {
          setEmailError('Пожалуйста, введите email.');
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          setEmailError('Пожалуйста, введите корректный email.');
          isValid = false;
        }
        if (!date) {
          setDateError('Пожалуйста, выберите дату.');
          isValid = false;
        }
        if (!comment.trim()) {
          setCommentError('Пожалуйста, введите комментарий.');
          isValid = false;
        }
        if (isValid) {
        const formData = {
          fio,
          phone,
          email,
          date: date ? new Date(date).toLocaleDateString() : '',
          comment,
          ...(isLoggedIn && isSuccess && userData ? { userId: userData.id, birthday: userData.birthday } : {}),
        };
        console.log('Данные формы (из Redux):', formData);
        setFormDataForModal(formData);
        setIsModalOpen(true);
        // dispatch(resetForm()); 
        }
        }, [fio, phone, email, date, comment, isLoggedIn, isSuccess, userData]);
        return (
        <div className={styles.feedbackFormContainer}>
            <h2>Обратная связь</h2>
            <form onSubmit={handleSubmit}>
              {/* скрытая часть формы */}
            {isLoggedIn && isSuccess && userData && (
              <>
                <input type="hidden" name="userId" value={userData?.id} />
                <input type="hidden" name="birthday" value={userData?.birthday} />
              </>
            )}
            {isLoggedIn && isFetching && <p>Загрузка данных пользователя...</p>}
            {isLoggedIn && isError && <p>Ошибка загрузки данных пользователя: {error ? JSON.stringify(error) : 'Неизвестная ошибка'}</p>}
            {/* основная форма */}
            <div className={styles.formGroup}>
            <label htmlFor="fio">ФИО:</label>
            <input
                type="text"
                id="fio"
                value={fio}
                onChange={handleFioChange}
            />
            {fioError && <div className={styles.errorMessage}>{fioError}</div>}
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон:</label>
            <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
            />
            {phoneError && <div className={styles.errorMessage}>{phoneError}</div>}
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
            />    
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="date">Дата:</label>
            <DatePicker
                selected={date ? new Date(date) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
               />
            {dateError && <div className={styles.errorMessage}>{dateError}</div>}
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="comment">Комментарий:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
            />
            {commentError && <div className={styles.errorMessage}>{commentError}</div>}
            </div>
            <button type="submit">Отправить</button>
            </form>
            {isModalOpen && formDataForModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Вы отправили следующие данные</h2>
            <p>ФИО: {formDataForModal.fio}</p>
            <p>Телефон: {formDataForModal.phone}</p>
            <p>Почта: {formDataForModal.email}</p>
            <p>Дата: {formDataForModal.date}</p>
            <p>Комментарий: {formDataForModal.comment}</p>
            {formDataForModal.userId && <p>ID пользователя: {formDataForModal.userId}</p>}
            {formDataForModal.birthday && <p>Дата рождения: {formDataForModal.birthday}</p>}
            <button className={styles.closeButton} onClick={() => { setIsModalOpen(false); dispatch(resetForm()); setFormDataForModal(null); }}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}    
        </div>
    )
}
export default Feedback