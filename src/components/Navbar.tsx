import React from "react"
import styles from "./Navbar.module.css";
import logoIMG from "../../assets/logoClaudioPNG.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbarLogo}>
                <img className={styles.imgLogo} src={logoIMG} alt="" />
            </div>
            <div className={styles.navbarMenu}>
                <NavLink className={styles.linksnavbarMenu} to="/main">Home</NavLink>
                <NavLink className={styles.linksnavbarMenu} to="/obras">Obras</NavLink>
                <NavLink className={styles.linksnavbarMenu} to="/facturas">Facturas</NavLink>
                <NavLink className={styles.linksnavbarMenu} to="/provedores">Provedores</NavLink>
            </div>
        </div>
    )
}