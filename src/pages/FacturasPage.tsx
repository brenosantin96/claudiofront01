import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import '../index.css'

export const FacturasPage = () => {
    return (
        <>
            <Navbar />
            <div className="containerFacturasPage">
                Pagina das facturas gerais.
            </div>
        </>
    )
}