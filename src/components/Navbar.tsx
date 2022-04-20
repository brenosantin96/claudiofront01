import React from "react"
import styles from "./Navbar.module.css";
import logoIMG from "../../assets/logoClaudioPNG.png";

export const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbarLogo}>
                <img className={styles.imgLogo} src={logoIMG} alt="" />
            </div>
            <div className={styles.navbarMenu}>
                <a className={styles.linksnavbarMenu} href="#">Obras</a>
                <a className={styles.linksnavbarMenu} href="#">Facturas</a>
                <a className={styles.linksnavbarMenu} href="#">Provedores</a>
            </div>
        </div>
    )
}