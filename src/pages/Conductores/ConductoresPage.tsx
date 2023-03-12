import '../../index.css'
import { api } from "../../api";
import { ChangeEvent, useEffect, useState } from "react";
import { Provedor } from '../../components/provedores/Provedor'
import { Navbar2 } from "../../components/Navbar2";
import {ConductorType} from '../../types/ConductorType'
import { ConductorComponent } from '../../components/conductores/ConductorComponent';


export const ConductoresPage = () => {

    const [conductoresInfo, setConductoresInfo] = useState<ConductorType[]>([])
    const [nameConductor, setNameConductor] = useState('');
    const [activeCondutor, setActiveConductor] = useState(true);

    const [addingConductor, setAddingConductor] = useState(false);



    useEffect(() => { getConductores(); }, [])

    const getConductores = async () => {

        const data = await api.getAllConductores();
        setConductoresInfo(data);

    }

    const showAddConductor = () => {
        setAddingConductor(true);
    }



    const handleChangeInputNameConductor = (e: ChangeEvent<HTMLInputElement>) => {
        setNameConductor(e.target.value);
    }

    const handleChangeActiveConductor = (e: ChangeEvent<HTMLInputElement>) => {
        setActiveConductor(e.target.checked);
    }

    const addConductor = async () => {
        const data = await api.createConductor(nameConductor, activeCondutor);
        if (data) {
            console.log("Conductor creado con suceso");
            setAddingConductor(false);
        }

        getConductores();
    }



    return (
        <>
            <Navbar2 />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-2 leftSideProvedores">
                        {conductoresInfo.map((item) => (<ConductorComponent key={item.id} id={item.id} name={item.name}></ConductorComponent>))}
                    </div>
                    <div className="col-12 col-md-6 mt-2 rightSideProvedores">
                        <button onClick={showAddConductor}>Nuevo</button>


                        {/* Add Provedor Form */}
                        {addingConductor && <div className="newProvedorForm">
                            <h2>Agregar un conductor</h2>
                            <input type="text" placeholder="Introduce el nombre del conductor" onChange={handleChangeInputNameConductor} />
                            <label htmlFor="activeConductor">Activo:</label>
                            <input type="checkbox" name="activeConductor" onChange={handleChangeActiveConductor} />
                            <button onClick={addConductor}>Agregar conductor</button>
                            <button onClick={() => setAddingConductor(false)}>Cierrar</button>
                        </div>}

                    </div>
                </div>
            </div>
        </>
    )
}