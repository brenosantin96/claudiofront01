import React from "react"
import '../index.css';
import logoIMG from "../../assets/logoClaudioPNG.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="containerNavBar">
            <div className="navbarLogo">
                <img className="imgLogo" src={logoIMG} alt="" />
            </div>
            <div className="navbarMenu">
                <NavLink className="linksnavbarMenu" to="/main">Home</NavLink>
                <NavLink className="linksnavbarMenu" to="/obras">Obras</NavLink>
                <NavLink className="linksnavbarMenu" to="/facturas">Facturas</NavLink>
                <NavLink className="linksnavbarMenu" to="/provedores">Provedores</NavLink>
            </div>
        </div>
    )
}