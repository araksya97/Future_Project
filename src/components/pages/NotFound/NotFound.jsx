import React from 'react';
import styles from './NotFoundStyle.module.css'
export default function About() {

    return (
       <div className={styles.notfound} >
           <h1>oops!!</h1>
            <p className={styles.notfoundel}>Page not found</p>
       </div>
    )
};