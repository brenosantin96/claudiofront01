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

    const [provedoresData, setProvedoresData] = useState("");
    const [provedoresInfo, setProvedoresInfo] = useState<any>([])


    useEffect(() => {
        api.getAllProvedores()
            .then((data) => { setProvedoresData(data); setProvedoresInfo(data); })
            .catch((err) => console.log(err))
    })

    return (
        <>
            <Navbar />
            <div className={styles.containerProvedores}>
                <div className={styles.leftSideProvedores}>
                    <ul>
                    {provedoresInfo.map((item : any, index : number)=> (<li> {item} </li>))}
                    </ul>
                </div>
                <div className={styles.rightSideProvedores}>

                </div>
            </div>
        </>
    )
}