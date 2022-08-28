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
    data: Date,
}

interface obrasInterface {
    id: number;
    name: string;
    direccion?: string;
    presupuesto?: number;
    dateStart?: Date;
}

type OptionTypeObra = {
    value: string;
    idobra: number;
};

type OptionTypeProveedor = {
    value: string;
    idobra: number;
};


export const FacturasPage = () => {

    //To List Facturas
    const [facturas, setFacturas] = useState<facturaInterface[]>([])

    //Getting Foreing Keys.
    const [proveedores, setProveedores] = useState<proveedorInterface[]>([])
    const [obras, setObras] = useState<obrasInterface[]>([])

    //Selecteds
    const [proveedorSelected, setProveedorSelected] = useState<proveedorInterface>();
    const [obraSelected, setObraSelected] = useState<obrasInterface>();

    //Booleans 
    const [numberFactura, setNumberFactura] = useState(0);
    const [driver, setDriver] = useState('');
    const [addingFactura, setAddingFactura] = useState(false)
    const [priceFacturaBase, setPriceFacturaBase] = useState(0);

    //To start adding factura:
    const showAddFacturas = () => {
        console.log("Cliquei no botao e dei um console log para ver se a informacao de facturas foi trazida:", facturas)
        console.log("Cliquei no botao e dei um console log para ver se a informacao de proveedores foi trazida:", proveedores)
        setAddingFactura(true);
    }

    //Variables of Factura
    const [dateFactura, setDateFactura] = useState<Date>(new Date());

    useEffect(() => {
        getApiFacturas();
        getProveedores();
        getObras();

    }, [])


    let getApiFacturas = async () => {
        let response = await api.getFacturas()
            .then((response) => {
                setFacturas(response);
            })
            .then(() => {
                console.log("Listnado faturas: ", facturas)
            })
    }

    let getObras = async () => {
        let response = await api.getAllObras()
            .then((response) => {
                setObras(response);
            })
            .then(() => {
                console.log("Listando obras: ", obras)
            })
    }

    let getProveedores = async () => {
        let response = await api.getAllProvedores()
            .then((response) => {
                setProveedores(response);
            })
            .then(() => {
                console.log("Listnado provedores: ", proveedores)
            })
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

            console.log("Facturas: ", facturas)
            console.log("Proveedores: ", proveedores)

            setDateFactura(dateStarted);

        }

    }

    const handleChangeObra = (e: React.ChangeEvent<HTMLSelectElement>) => {
       // setObraSelected(e.target);
    }

    const handleChangeProveedor = (e: ChangeEvent<HTMLDataElement>) => {


    }

    //Adding factura

    const addFactura = async () => {
        const data = {
            numero: numberFactura,
            data: dateFactura,
            precioBase: priceFacturaBase,
            comprador: driver,
            obra: obraSelected
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
                                <select name="proveedores" id="">
                                    {proveedores &&
                                        proveedores.map((item) => (<option key={item.id} value={item.name}>{item.name}</option>))
                                    }
                                </select>
                                <input type="date" placeholder="Fecha factura" onChange={handleChangeDateFactura} />
                                <input type="text" placeholder="Quien has comprado la factura" onChange={e => setDriver(e.target.value)} />
                                <input type="number" placeholder="Importe Base" onChange={e => setPriceFacturaBase(parseFloat(e.target.value))} />
                                <select name="obras" id="" onChange={handleChangeObra}>
                                    {obras &&
                                        obras.map((item) => { return (<option key={item.id} value={item.name} defaultValue="Seleccione una obra">{item.name}</option>) })
                                    }
                                </select>
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