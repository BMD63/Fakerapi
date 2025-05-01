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
} from '../features/feedbackFormSlice'
// import styles from './Feedback.module.scss'

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
    const handleDateChange = (date: Date | null) => {
        dispatch(setDate(date))
    }
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setComment(e.target.value))
    }
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
          fio,
          phone,
          email,
          date: date ? date.toLocaleDateString() : '',
          comment,
        };
        console.log('Данные формы (из Redux):', formData);
        dispatch(resetForm()); // Очищаем форму после "отправки"
        // TODO: Показать модальное окно
      }, [fio, phone, email, date, comment, dispatch]);
    return (
        <div>
            <h1>Страница обратной связи</h1>
        </div>
    )
}
export default Feedback