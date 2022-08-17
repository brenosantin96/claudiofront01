import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import '../index.css'
import { Navbar2 } from '../components/Navbar2'
import { useEffect, useState } from "react";
import { api } from '../api'
import { FacturaComponent } from "../components/facturas/FacturaComponent";

interface facturaInterface {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    dateStart?: Date;
}


export const FacturasPage = () => {

    //To List Facturas
    const [facturas, setFacturas] = useState<facturaInterface[]>([])

    useEffect(() => {
        getApiFacturas();
    }, [])

    let getApiFacturas = async () => {
        let response = await api.getFacturas();
        setFacturas(response);
    }


    return (
        <>
            <Navbar2 />
            <div className="containerFacturasPage">
                <ul>
                   {facturas.map((item)=> (<FacturaComponent id={item.id} numero={item.number} />))}
                </ul>
            </div>
        </>
    )
}

//{facturas.map((item => (<li>{`${item.number} - ${item.dateFactura} = ${item.valor}$`}</li>)))}

/* {facturas &&
                   
    <ul>
       {facturas.map((item) => (<li>{`${item.number} - ${item.dateFactura} = ${item.valor}$`} </li>))}
    </ul>

} */