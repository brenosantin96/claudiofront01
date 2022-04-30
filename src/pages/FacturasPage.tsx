import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import 'bootstrap/dist/css/bootstrap.css';

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