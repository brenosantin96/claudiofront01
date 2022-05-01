import { Navbar } from "../components/Navbar"
import '../index.css'
import { api } from "../api";
import { ChangeEvent, useEffect, useState } from "react";
import { Provedor } from '../components/provedores/Provedor'

interface provedorInterface {
    id: number;
    name: string;
}

export const ProvedoresPage = () => {

    const [provedoresInfo, setProvedoresInfo] = useState<provedorInterface[]>([])
    const [nameProvedor, setNameProvedor] = useState('');

    const [idForEditProvedor, setidForEditProvedor] = useState(0);
    const [foundProvedor, setFoundProvedor] = useState('');

    const [addingProvedor, setAddingProvedor] = useState(false);
    const [edittingProvedor, setEdittingProvedor] = useState(false);

    useEffect(() => { getProvedores(); }, [])

    const getProvedores = async () => {
        const data = await api.getAllProvedores();
        setProvedoresInfo(data);
    }

    const showAddProvedor = () => {
        setAddingProvedor(true);
    }

    const showEditProvedor = () => {
        setEdittingProvedor(true);
    }

    const handleChangeInputNameProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setNameProvedor(e.target.value);
    }

    const handleChangeInputIDForEditProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setidForEditProvedor(parseInt(e.target.value));
        getInfoOneProvedor(idForEditProvedor);
    }

    const addProvedor = async () => {
        const data = await api.createProvedor(nameProvedor);
        if (data) {
            console.log("Provedor criado com sucesso");
            setAddingProvedor(false);
        }
        getProvedores();
    }

    const getInfoOneProvedor = async (id: number) => {

        const data = await api.GetOneProvedor(id);

        if (data.name) {
            setNameProvedor(data.name);
            return;
        }

        if (data.provedor.name) {
            setNameProvedor(data.provedor.name)
            console.log(data);
            return;
        }

    }

    const editProvedor = async () => {
        //   const data = await api.ge
    }


    return (
        <>
            <Navbar />
            <div className="containerProvedores">
                <div className="leftSideProvedores">
                    {provedoresInfo.map((item) => (<Provedor key={item.id} id={item.id} name={item.name}></Provedor>))}
                </div>
                <div className="rightSideProvedores">
                    <button onClick={showAddProvedor}>Nuevo</button>
                    <button onClick={showEditProvedor}>Editar</button>

                    {/* Add Provedor Form */}
                    {addingProvedor && <div className="newProvedorForm">
                        <input type="text" placeholder="Informe o nome do novo provedor" onChange={handleChangeInputNameProvedor} />
                        <button onClick={addProvedor}>Adicionar provedor</button>
                        <button onClick={() => setAddingProvedor(false)}>Fechar</button>
                    </div>}

                    {/* Edit Provedor Form */}
                    {edittingProvedor && <div className="editProvedorForm">
                        <h2>Editando um provedor</h2>
                        <label>ID:
                            <input type="number" onChange={handleChangeInputIDForEditProvedor} />
                        </label>
                        <h3>{nameProvedor}</h3>
                        <button onClick={() => setEdittingProvedor(false)}>Fechar</button>
                    </div>}


                </div>
            </div>
        </>
    )
}