import { Navbar } from "../components/Navbar"
import styles from "./ObrasPage.module.css"

export const ObrasPage = () => {
    return (

        <>
            <Navbar />
            <div className={styles.containerObrasPage}>
                Pagina do Obras.
            </div>
        </>
    )
}