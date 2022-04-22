import { Navbar } from "../components/Navbar"
import styles from "./ProvedoresPage.module.css"
import { api } from "../api";
import { useEffect, useState } from "react";


const provedoresList = async () => {
    const provedores = await api.getAllProvedores()
    return provedores;
}

interface provedorInterface {
    id: number;
    name: string;
}



export const ProvedoresPage = () => {

    const [provedoresData, setProvedoresData] = useState<provedorInterface>([]);


    useEffect(() => {
        api.getAllProvedores()
            .then((data) => setProvedoresData(data))
            .catch((err) => console.log(err))
    })

    return (
        <>
            <Navbar />
            <div className={styles.containerProvedores}>
                <div className={styles.leftSideProvedores}>
                    {provedoresData &&

                        provedoresData.map((item) => (<li>{item.id} - {item.name}</li>))}

                </div>
                <div className={styles.rightSideProvedores}>

                </div>
            </div>
        </>
    )
}