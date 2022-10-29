import { Navbar } from "../components/Navbar"
import styles from "./FacturasPage.module.css"
import '../index.css'
import { Navbar2 } from '../components/Navbar2'
import { ChangeEvent, useEffect, useState } from "react";
import Select from 'react-select';
import { api } from '../api'
import { FacturaComponent } from "../components/facturas/FacturaComponent";
import { FormSelect, NavItem } from "react-bootstrap";

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
    label?: string,
    value?: string
}

interface obrasInterface {
    id: number;
    name: string;
    direccion?: string;
    presupuesto?: number;
    dateStart?: Date;
    label?: string,
    value?: string
}

interface conductorInterface {
    id: number;
    name: string;
    active: boolean;
    label?: string,
    value?: string
}



export const FacturasPage = () => {


    //To List Facturas
    const [facturas, setFacturas] = useState<facturaInterface[]>([])

    //Getting Foreing Keys.
    const [proveedores, setProveedores] = useState<proveedorInterface[]>([])
    const [obras, setObras] = useState<obrasInterface[]>([])
    const [conductores, setConductores] = useState<conductorInterface[]>([]);


    //Selecteds
    const [proveedorSelected, setProveedorSelected] = useState<proveedorInterface>();
    const [obraSelected, setObraSelected] = useState<obrasInterface>();
    const [conductorSelected, setConductorSelected] = useState<obrasInterface>();

    //Booleans 
    const [numberFactura, setNumberFactura] = useState(0);
    const [addingFactura, setAddingFactura] = useState(false)
    const [priceFacturaBase, setPriceFacturaBase] = useState(0);


    //To start adding factura:
    const showAddFacturas = () => {
        setAddingFactura(true);
        //ao clicar para adicionar fatura, faz um map em proveedores adicionando value e label para exibir no select.
        let optionsProveedores = proveedores.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));
        let optionsObras = obras.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));
        let optionsConductores = conductores.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));
        setProveedores(optionsProveedores);
        setConductores(optionsConductores);
        setObras(optionsObras);

    }

    //Variables of Factura
    const [dateFactura, setDateFactura] = useState<Date>(new Date());

    useEffect(() => {
        getApiFacturas();
        getProveedores();
        getConductores();
        getObras();

    }, [])


    let getApiFacturas = async () => {
        await api.getFacturas()
            .then((response) => {
                setFacturas(response);
            })
    }

    let getObras = async () => {
        await api.getAllObras()
            .then((response) => {
                setObras(response);
            })
            .then(() => {

            })
    }

    let getProveedores = async () => {
        return await api.getAllProvedores()
            .then((response) => {
                setProveedores(response);
            }).then(() => { })
    }

    let getConductores = async () => {
        return await api.getAllConductores()
            .then((response) => {
                setConductores(response);
            }).then(() => { })
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



            setDateFactura(dateStarted);

        }

    }

    const HandleSelectedObra = (obj: any) => {
        setObraSelected(obj);
        console.log(obj);
    };

    //Handle Selected Proveedor
    const HandleSelectedProveedor = (obj: any) => {
        setProveedorSelected(obj);
        console.log(obj);
    };

    //Handle Selected Conductor
    const HandleSelectedConductor = (obj: any) => {
        setConductorSelected(obj);
        console.log(obj);
    };


    //Adding factura

    const addFactura = async () => {


        if (proveedorSelected === undefined || obraSelected === undefined) {
            alert("Proveedor y obra deben ser seleccionados")
        } else {
            const data = {
                numero: numberFactura,
                data: dateFactura,
                precioBase: priceFacturaBase,
                comprador: conductorSelected,
                obra: obraSelected,
                proveedor: proveedorSelected
            }

            console.log(data);

        }
    }

    const createFactura = async () => {

        if (conductorSelected && obraSelected && proveedorSelected) {
            /* const showData = {
                numberFactura: numberFactura.toString(),
                dateFactura: dateFactura,
                priceFacturaBase,
                conductorSelectedID : conductorSelected.id,
                obraSelectedID: obraSelected.id,
                proveedorSelectedID: proveedorSelected.id
            } */
            const data = await api.createFacturas(numberFactura, dateFactura, priceFacturaBase, conductorSelected.id, obraSelected.id, proveedorSelected.id);
            console.log(data);
        } 

        getApiFacturas();

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
                                <Select placeholder="Proveedor" options={proveedores} onChange={HandleSelectedProveedor} />
                                <Select placeholder="Obra" options={obras} onChange={HandleSelectedObra} />
                                <input type="date" placeholder="Fecha factura" onChange={handleChangeDateFactura} />
                                <Select placeholder="Conductor" options={conductores} onChange={HandleSelectedConductor} />
                                <input type="number" placeholder="Importe Base" onChange={e => setPriceFacturaBase(parseFloat(e.target.value))} />
                                <button onClick={createFactura}>Agregar Factura</button>
                                <button onClick={() => setAddingFactura(false)}>Cierrar</button>
                            </div>}

                    </div>

                </div>
            </div>
        </>
    )
}

//{facturas.map((item => (<li>{`${item.number} - ${item.dateFactura} = ${item.valor}$`}</li>)))}
/* {proveedores &&
    proveedores.map((item) => (<option key={item.id} value={item.name}>{item.name}</option>))
} */
/* {facturas &&
                   
    <ul>
       {facturas.map((item) => (<li>{`${item.number} - ${item.dateFactura} = ${item.valor}$`} </li>))}
    </ul>

} */