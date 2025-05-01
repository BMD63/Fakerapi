import React from 'react';
import { useGetPersonQuery } from '../services/personsApi';
// import { PersonData } from '../types/persons';
import styles from './PersonalAccount.module.scss';
const PersonalAccount: React.FC  = () => {
    const {data: personData,isLoading, isError, error} = useGetPersonQuery();
    console.log('personData', personData);
    console.log('isLoading', isLoading);
    console.log('isError', isError);
    console.log('error', error);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        let errorMessage = 'Неизвестная ошибка';
        if (error) {
            if ( 'data' in error) {
                errorMessage = 'Ошибка загрузки данных' + JSON.stringify(error.data);
            } else if ('message' in error) {
                errorMessage = 'Ошибка загрузки данных' + error.message;
            }
            return <div className={styles.error}> {errorMessage}</div>;
        }
        
    }
    if (!personData) {
        return <div>Person data not found</div>;
    }
    if (personData) {
        return (
            <div className={styles.personalAccountContainer}>
                <h2 className={styles.title}>Личный кабинет</h2>
                <div className={styles.infoBlocks}>
                    <div className={styles.personalInfoBlock}>
                    <h3>Персональные данные:</h3>
                    <p className={styles.info}>ID: {personData.id}</p>
                    <p className={styles.info}>Имя: {personData.firstname}</p>
                    <p className={styles.info}>Фамилия: {personData.lastname}</p>
                    <p className={styles.info}>Email: {personData.email}</p>
                    <p className={styles.info}>Телефон: {personData.phone}</p>
                    <p className={styles.info}>День рождения: {personData.birthday}</p>
                    <p className={styles.info}>Пол: {personData.gender}</p>
                    </div>     
                
                <div className={styles.addressInfoBlock}>
                <h3>Адрес:</h3>
                <p className={styles.info}>Улица: {personData.address.street}</p>
                <p className={styles.info}>Название улицы: {personData.address.streetName}</p>
                <p className={styles.info}>Номер дома: {personData.address.buildingNumber}</p>
                <p className={styles.info}>Город: {personData.address.city}</p>
                <p className={styles.info}>Почтовый код: {personData.address.zipcode}</p>
                <p className={styles.info}>Страна: {personData.address.country}</p>
                <p className={styles.info}>Код страны: {personData.address.country_code}</p>
                <p className={styles.info}>Широта: {personData.address.latitude}</p>
                <p className={styles.info}>Долгота: {personData.address.longitude}</p>
                <p className={styles.info}>Веб-сайт: {personData.website}</p>
                <div className={styles.imageContainer}>
                    <img src={personData.image} alt={`${personData.firstname} ${personData.lastname}`} />
                </div>
                </div>  
                </div>
            </div>
        );
    }
    return (
        null
    )
}
export default PersonalAccount