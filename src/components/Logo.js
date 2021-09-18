import { useStyles } from '../styles';
import React from 'react'

export default function Logo() {
    const styles = useStyles();

    return (
        <img
            src="/images/logo1.png"
            alt="Food order"
            className={styles.largeLogo}
        ></img>
    );
}
