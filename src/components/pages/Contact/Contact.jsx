import React, { useState } from 'react';
import styles from './ContactStyle.module.css'
import { connect } from 'react-redux';
import { contactForm } from '../../../store/actions'

const defaultValues = {
    name: '',
    email: '',
    message: ''
};
function Contact(props) {
    const [values, setValues] = useState(defaultValues)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value,
        });
    };
    const sendContact = () => {
        if (values === defaultValues) {
            return;
        }
        props.contactForm(values)
        setValues(defaultValues);
    };
    return (
        <div className={styles.form}>
            <h3>
                Contact Us
            </h3>
            <input
                required
                className={styles.formElem}
                type='text'
                name='name'
                value={values.name}
                placeholder='Name'
                onChange={handleChange}
            />
            <input
                required
                className={styles.formElem}
                type='email'
                name='email'
                value={values.email}
                placeholder='Email'
                onChange={handleChange}
            />
            <textarea
                required
                className={styles.formElem}
                name='message'
                value={values.message}
                placeholder='Message'
                onChange={handleChange}
            >
            </textarea>
            <button
                className={styles.formButton}
                onClick={sendContact}
            >
                Send
            </button>
        </div>
    )
};
const mapDispatchToProps = {
    contactForm,
};
export default connect(null, mapDispatchToProps)(Contact)
