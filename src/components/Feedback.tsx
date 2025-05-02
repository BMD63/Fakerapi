import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
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
    const handleFioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFio(e.target.value))
    }
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPhone(e.target.value))
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(e.target.value))
    }
    const handleDateChange = useCallback((newDate: Date | null) => {
        dispatch(setDate(newDate))
      }, [dispatch]);
    
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setComment(e.target.value))
    }
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        
        const formData = {
          fio,
          phone,
          email,
          date: date ? new Date(date).toLocaleDateString() : '',
          comment,
        };
        console.log('Данные формы (из Redux):', formData);
        dispatch(resetForm()); // Очищаем форму после "отправки"
      }, [fio, phone, email, date, comment, dispatch]);
    return (
        <div className={styles.feedbackFormContainer}>
            <h2>Обратная связь</h2>
            <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label htmlFor="fio">ФИО:</label>
            <input
                type="text"
                id="fio"
                value={fio}
                onChange={handleFioChange}
            />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон:</label>
            <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
            />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
            />    
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="date">Дата:</label>
            <DatePicker
                selected={date ? new Date(date) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
               />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="comment">Комментарий:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
            />
            </div>
            <button type="submit">Отправить</button>
            </form>
                
        </div>
    )
}
export default Feedback