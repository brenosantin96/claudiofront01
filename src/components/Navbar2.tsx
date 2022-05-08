import React from "react"
import '../index.css';
import logoIMG from "../../assets/logoClaudioPNG.png";
import { NavLink } from "react-router-dom";

export const Navbar2 = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light h-25">
            <div className="container-fluid d-flex">
                <div className="logo">
                    <a className="navbar-brand" href="#">
                        <img className="imgLogo" src={logoIMG} alt="" />
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="linksnavbarMenu" to="/main">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="linksnavbarMenu" to="/obras">Obras</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="linksnavbarMenu" to="/facturas">Facturas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="linksnavbarMenu" to="/provedores">Provedores</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}