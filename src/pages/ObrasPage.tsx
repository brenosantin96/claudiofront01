import { Navbar } from "../components/Navbar"
import styles from "./ObrasPage.module.css"
import 'bootstrap/dist/css/bootstrap.css';

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