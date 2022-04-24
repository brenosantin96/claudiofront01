import { Navbar } from "../components/Navbar"
import styles from "./ProvedoresPage.module.css"
import { api } from "../api";
import { useEffect, useState } from "react";


interface provedorInterface {
    id: number;
    name: string;
}

export const ProvedoresPage = () => {

    const [provedoresInfo, setProvedoresInfo] = useState<provedorInterface[]>([])

    useEffect(()=> {getProvedores();}, [])

    const getProvedores = async () => {
        const data = await api.getAllProvedores();
        setProvedoresInfo(data);
    }


    return (
        <>
            <Navbar />
            <div className={styles.containerProvedores}>
                <div className={styles.leftSideProvedores}>
                    <ul>
                        {provedoresInfo.map((item, index)=> (<li key={index}>{item.id} {item.name}</li>))}
                    </ul>
                </div>
                <div className={styles.rightSideProvedores}>

                </div>
            </div>
        </>
    )
}