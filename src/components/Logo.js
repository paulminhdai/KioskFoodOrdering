import { useStyles } from '../styles';
import React from 'react'

export default function Logo(props) {
    const styles = useStyles();

    return (
        <img
            src="/images/logo.png"
            alt="Food order"
            className={props.large ? styles.largeLogo : styles.logo}
        ></img>
    );
}
