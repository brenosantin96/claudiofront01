import '../../index.css'
import { api } from "../../api";
import { ChangeEvent, useEffect, useState } from "react";
import { Provedor } from '../../components/provedores/Provedor'
import { Navbar2 } from "../../components/Navbar2";

interface provedorInterface {
    id: number;
    name: string;
}

export const ProvedoresPage = () => {

    const [provedoresInfo, setProvedoresInfo] = useState<provedorInterface[]>([])
    const [nameProvedor, setNameProvedor] = useState('');

    const [addingProvedor, setAddingProvedor] = useState(false);



    useEffect(() => { getProvedores(); }, [])

    const getProvedores = async () => {

        const data = await api.getAllProvedores();
        setProvedoresInfo(data);

    }

    const showAddProvedor = () => {
        setAddingProvedor(true);
    }



    const handleChangeInputNameProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setNameProvedor(e.target.value);
    }

    const addProvedor = async () => {
        const data = await api.createProvedor(nameProvedor);
        if (data) {
            console.log("Provedor criado com sucesso");
            setAddingProvedor(false);
        }

        getProvedores();
    }



    return (
        <>
            <Navbar2 />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-2 leftSideProvedores">
                        {provedoresInfo.map((item) => (<Provedor key={item.id} id={item.id} name={item.name}></Provedor>))}
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                        <button onClick={showAddProvedor}>Nuevo</button>


                        {/* Add Provedor Form */}
                        {addingProvedor && <div className="newProvedorForm">
                            <h2>Agregar un provedor</h2>
                            <input type="text" placeholder="Introduce el nombre del proveedor" onChange={handleChangeInputNameProvedor} />
                            <button onClick={addProvedor}>Agregar provedor</button>
                            <button onClick={() => setAddingProvedor(false)}>Cierrar</button>
                        </div>}

                    </div>
                </div>
            </div>
        </>
    )
}