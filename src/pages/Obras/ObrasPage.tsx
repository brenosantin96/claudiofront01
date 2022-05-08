import { useState, useEffect, ChangeEvent } from 'react'
import '../../index.css'
import { api } from '../../api';
import { ObraComponent } from '../../components/obras/ObraComponent';
import { Navbar2 } from '../../components/Navbar2';

interface obrasInterface {
    id: number;
    name: string;
    direccion?: string;
    presupuesto?: number;
    dateStart?: Date;
}


export const ObrasPage = () => {

    //To List Obras
    const [obrasInfo, setObrasInfo] = useState<obrasInterface[]>([])

    //To Add new Obra
    const [nameObra, setNameObra] = useState('');
    const [direccionObra, setDireccionObra] = useState('');
    const [presupuestoObra, setPresupuestoObra] = useState(0);
    const [dateStartObra, setDateStartObra] = useState<Date>(new Date());
    const [addingObra, setAddingObra] = useState(false);

    useEffect(() => { getObras() }, []);

    const getObras = async () => {

        const data = await api.getAllObras();
        if (data) {
            console.log(data);
            setObrasInfo(data);
        }

    }

    //Booleans

    const showAddObras = () => {
        setAddingObra(true);
    }

    //Handling inputs
    const handleChangeInputNameObra = (e: ChangeEvent<HTMLInputElement>) => {
        setNameObra(e.target.value);
    }

    const handleChangeDireccionObra = (e: ChangeEvent<HTMLInputElement>) => {
        setDireccionObra(e.target.value);
    }

    const handleChangePresupuestoObra = (e: ChangeEvent<HTMLInputElement>) => {
        setPresupuestoObra(parseFloat(e.target.value));
    }

    const handleChangeDateObra = (e: ChangeEvent<HTMLDataElement>) => {

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
            setDateStartObra(dateStarted);

        }

    }


    //Button Functions

    const addObra = async () => {
        const data = await api.createObra(nameObra, direccionObra, presupuestoObra, dateStartObra);

        if (data.msg === "Nome e endereço precisam ser preenchidos.") {
            alert("Preencher os dados por favor");
            setAddingObra(false);
            setNameObra("");
            setDateStartObra(new Date());
            setDireccionObra("");
            setPresupuestoObra(0);
            return;
        }

        if (data) {
            console.log("Provedor criado com sucesso");
            setAddingObra(false);
            setNameObra("");
            setDateStartObra(new Date());
            setDireccionObra("");
            setPresupuestoObra(0);
            console.log(data);
        }

        getObras();
    }



    return (

        <>
            <Navbar2 />
            <div className="containerObrasPage">
                <div className="leftSideObras">
                    {obrasInfo.map((item) => (<ObraComponent key={item.id} id={item.id} name={item.name}></ObraComponent>))}
                </div>
                <div className="rightSideObras">
                    <button onClick={showAddObras}>Nuevo</button>


                    {/* Add Obra Form */}
                    {addingObra && <div className="newObraForm">
                        <h2>Agregar una nueva obra</h2>
                        <input type="text" placeholder="Introduce el nombre de la obra" value={nameObra} onChange={handleChangeInputNameObra} />
                        <input type="text" placeholder="Introduce la direccion de la obra" onChange={handleChangeDireccionObra} />
                        <input type="number" placeholder="Introduce el presupuesto de la obra" onChange={handleChangePresupuestoObra} />
                        <input type="date" placeholder="Fecha de inicio" onChange={handleChangeDateObra} />
                        <button onClick={addObra}>Agregar Obra</button>
                        <button onClick={() => setAddingObra(false)}>Cierrar</button>
                    </div>}

                </div>
            </div>
        </>
    )
}