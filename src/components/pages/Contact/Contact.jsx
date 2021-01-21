import React, { useState } from 'react';
import styles from './ContactStyle.module.css'


const defaultValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
};
export default function Contact() {
    const [values, setValues] = useState(defaultValues)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value,
        });
    };
    const send = () => {
        if (values === defaultValues) {
            return;
        }
        console.log(values);

        setValues(defaultValues);
    };
    return (
        <div className={styles.form}>
            <input
                className={styles.formElem}
                type='text'
                name='name'
                value={values.name}
                placeholder='Name'
                onChange={handleChange}
            />
            <input
                className={styles.formElem}
                type='email'
                name='email'
                value={values.email}
                placeholder='Email'
                onChange={handleChange}
            />
            <input
                className={styles.formElem}
                type='phone'
                name='phone'
                value={values.phone}
                placeholder='Phone'
                onChange={handleChange}
            />
            <textarea
                className={styles.formElem}
                name='message'
                value={values.message}
                placeholder='Message'
                onChange={handleChange}
            >
            </textarea>
            <button 
                className={styles.formButton}
                onClick={send}
            >
                Send
            </button>
        </div>
    )
};