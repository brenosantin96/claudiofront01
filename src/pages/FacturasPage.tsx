import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import '../index.css'
import {Navbar2} from '../components/Navbar2'

export const FacturasPage = () => {
    return (
        <>
            <Navbar2 />
            <div className="containerFacturasPage">
                Pagina das facturas gerais.
            </div>
        </>
    )
}