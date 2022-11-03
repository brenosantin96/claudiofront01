import React from "react"
import '../index.css';
import logoIMG from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

export const Navbar2 = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navBarAttributes">
            <div className="container-fluid d-flex">
                <div className="logo">
                    <NavLink className="navbar-brand" to="/main">
                        <img className="imgLogo" src={logoIMG} alt="" />
                    </NavLink>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse collapsedNavBar" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item p-2">
                            <NavLink className="linksnavbarMenu" to="/main">Home</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink className="linksnavbarMenu" to="/obras">Obras</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink className="linksnavbarMenu" to="/facturas">Facturas</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink className="linksnavbarMenu" to="/provedores">Proveedores</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}