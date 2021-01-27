import React from 'react';
import styles from './FooterStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {

    return (
        <div className={styles.footer}>
            <div className={styles.footerFirst}>
                <h3>TODO LIST PAGE</h3>
                <p>This page is designed for keeping you informed  about your responsibilities. It will help you don't forget your any assignments. We can just call it "to do" page.</p>
            </div>
            <div className={styles.footerSec}>
                <ul>
                    <li>
                        <a href={"https://github.com/araksya97/Future_Project"} target="_blank">GitHub</a>
                    </li>
                    <li>
                        <a href={"https://www.linkedin.com/in/araksya-badalyan-001b34189"} target="_blank">LinkedIn</a>
                    </li>
                </ul>
            </div>
            <div className={styles.footerSec}> Created with <span><FontAwesomeIcon icon={faHeart} /></span> by Araksya Badalyan</div>
        </div>
    )
};

