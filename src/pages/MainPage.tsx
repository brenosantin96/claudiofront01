import React from "react";
import { Navbar } from "../components/Navbar";
import '../index.css'

export const Main = () => {
    return (
        <>
            <Navbar />
            <div className="containerMain">
                Olá, eu sou o Main.
            </div>
        </>

    )
};