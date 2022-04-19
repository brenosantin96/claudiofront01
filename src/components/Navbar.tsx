import React from "react"
import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbarLogo}>
                <img src="" alt="" />
            </div>
            <div className={styles.navbarMenu}>
                <a href="#">Obras</a>
                <a href="#">Facturas</a>
                <a href="#">Provedores</a>
            </div>
        </div>
    )
}