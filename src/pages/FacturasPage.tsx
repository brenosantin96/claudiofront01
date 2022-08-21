import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import '../index.css'
import { Navbar2 } from '../components/Navbar2'
import { ChangeEvent, useEffect, useState } from "react";
import { api } from '../api'
import { FacturaComponent } from "../components/facturas/FacturaComponent";
import { FormSelect } from "react-bootstrap";

interface facturaInterface {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    dateStart?: Date;
}

interface proveedorInterface {
    id: number;
    name: string;
}


export const FacturasPage = () => {

    //To List Facturas
    const [facturas, setFacturas] = useState<facturaInterface[]>([])

    //Getting Foreing Keys.
    const [proveedores, setProveedores] = useState<proveedorInterface[]>([])
    const [options, setOptions] = useState<proveedorInterface[]>([]);

    //Booleans 
    const [numberFactura, setNumberFactura] = useState(0);
    const [driver, setDriver] = useState('');
    const [addingFactura, setAddingFactura] = useState(false)
    const [priceFacturaBase, setPriceFacturaBase] = useState(0);

    //To start adding factura:
    const showAddFacturas = () => {
        setAddingFactura(true);
    }

    //Variables of Factura
    const [dateFactura, setDateFactura] = useState<Date>(new Date());

    useEffect(() => {
        getApiFacturas();
        getProveedores();

    }, [])

    let getApiFacturas = async () => {
        let response = await api.getFacturas();
        console.log(response)
        setFacturas(response);
    }

    let getProveedores = async () => {
        let response = await api.getAllProvedores();
        console.log(response);
        //NAO TO CONSEGUINDO FAZER O STATE PROVEEDORES SER POPULADO...

    }

    //HandleInputs

    const handleChangeDateFactura = (e: ChangeEvent<HTMLDataElement>) => {

        if (e.target.value.length >= 10) {

            let valueDateInput = e.target.value;
            let arrayDateYYMMDD = valueDateInput.split('-');


            let day: string = arrayDateYYMMDD[2];
            let month: string = arrayDateYYMMDD[1];
            let year: string = arrayDateYYMMDD[0];



            let numberDay: number = parseInt(day);
            let numberMonth: number = parseInt(month) - 1;
            let numberYear: number = parseInt(year);

            let dateStarted = new Date(numberYear, numberMonth, numberDay, 0, 0, 0);
            let dateToFormat = new Date(numberYear, numberMonth, numberDay, 0, 0, 0).toJSON();
            let dateFormatted = dateToFormat.split("T");
            console.log(dateFormatted[0]);
            console.log(dateFormatted);
            setDateFactura(dateStarted);

        }

    }

    //Adding factura

    const addFactura = async () => {
        const data = {
            numero: numberFactura,
            data: dateFactura,
            precioBase: priceFacturaBase,
            comprador: driver
        }

        console.log(data);
    }


    return (
        <>
            <Navbar2 />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-2 containerFacturasPage">
                        <ul>
                            {facturas.map((item) => (<FacturaComponent key={item.id} id={item.id} numero={item.number} />))}
                        </ul>
                    </div>

                    <div className="col-12 col-md-6 mt-2">
                        <button onClick={showAddFacturas}>Nuevo</button>


                        {/* Add Factura Form */}
                        {addingFactura &&

                            <div className="newObraForm">
                                <h2 style={{ color: 'white' }}>Agregar factura</h2>
                                <input type="number" placeholder="Numero factura" onChange={e => setNumberFactura(parseInt(e.target.value))} />
                                <FormSelect>

                                </FormSelect>
                                <input type="date" placeholder="Fecha factura" onChange={handleChangeDateFactura} />
                                <input type="text" placeholder="Quien has comprado la factura" onChange={e => setDriver(e.target.value)} />
                                <input type="number" placeholder="Importe Base" onChange={e => setPriceFacturaBase(parseFloat(e.target.value))} />
                                <button onClick={addFactura}>Agregar Factura</button>
                                <button onClick={() => setAddingFactura(false)}>Cierrar</button>
                            </div>}

                    </div>

                </div>
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