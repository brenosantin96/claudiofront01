import React from "react";
import { Navbar } from "../components/Navbar";
import styles from './MainPage.module.css'

export const Main = () => {
    return (
        <>
            <Navbar />
            <div className={styles.containerMain}>
                Olá, eu sou o Main.
            </div>
        </>

    )
};