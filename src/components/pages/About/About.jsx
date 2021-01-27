import React from 'react';
import styles from './AboutStyles.module.css'

export default function About() {
    return (
        <div className={styles.about}>
            <ul>
                <li>
                    <h3> ABOUT TODO LIST PAGE</h3>
                </li>
                <li>
                    <p>This page is designed for keeping you informed  about your responsibilities. It will help you don't forget your any assignments. We can just call it "to do" page.</p>
                </li>
                <li>
                    <p>Here you can see and explore my <a href={"https://github.com/araksya97/Future_Project"} >GitHub</a> souce code. </p>
                </li>
                <li>
                    <p>This is my <a href={"https://www.linkedin.com/in/araksya-badalyan-001b34189"}>LinkedIn</a> profile. </p>
                </li>
            </ul>

        </div>
    )
};

