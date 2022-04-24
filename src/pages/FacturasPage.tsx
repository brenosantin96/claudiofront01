import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"

export const FacturasPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.containerFacturasPage}>
                Pagina das facturas gerais.
            </div>
        </>
    )
}