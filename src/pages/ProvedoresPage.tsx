import { Navbar } from "../components/Navbar"
import styles from "./ProvedoresPage.module.css"

export const ProvedoresPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.containerProvedores}>
                Pagina dos provedores.
            </div>
        </>
    )
}