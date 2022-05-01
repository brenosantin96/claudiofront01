import { Navbar } from "../components/Navbar"
import '../index.css'
import { api } from "../api";
import { ChangeEvent, useEffect, useState } from "react";
import { Provedor } from '../components/provedores/Provedor'
import { useNavigate } from 'react-router-dom';

interface provedorInterface {
    id: number;
    name: string;
}

export const ProvedoresPage = () => {

    let navigate = useNavigate();

    const [provedoresInfo, setProvedoresInfo] = useState<provedorInterface[]>([])
    const [nameProvedor, setNameProvedor] = useState('');

    const [idForEditProvedor, setidForEditProvedor] = useState(0);
    const [showInfosToEdit, setshowInfosToEdit] = useState(false);

    const [addingProvedor, setAddingProvedor] = useState(false);
    const [edittingProvedor, setEdittingProvedor] = useState(false);
    const [inputNameEditProvedor, setInputNameEditProvedor] = useState('');

    const [excludingProvedor, setExcludingProvedor] = useState(false);

    useEffect(() => { getProvedores(); }, [edittingProvedor])

    const getProvedores = async () => {
        const data = await api.getAllProvedores();
        setProvedoresInfo(data);
    }

    const showAddProvedor = () => {
        setAddingProvedor(true);
        setEdittingProvedor(false);
        setExcludingProvedor(false);
    }

    const showEditProvedor = () => {
        setAddingProvedor(false);
        setEdittingProvedor(true);
        setExcludingProvedor(false);
    }

    const showExcludeProvedor = () => {
        setAddingProvedor(false);
        setEdittingProvedor(false);
        setExcludingProvedor(true);
    }

    const handleChangeInputNameProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setNameProvedor(e.target.value);
    }

    const handleChangeInputIDForEditProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setidForEditProvedor(parseInt(e.target.value));
    }

    const handleChangeInputEditNameProvedor = (e: ChangeEvent<HTMLInputElement>) => {
        setInputNameEditProvedor(e.target.value);
    }

    const searchOneProvedor = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            setshowInfosToEdit(false);
            return;
        }

        if (data.provedor.name) {
            setNameProvedor(data.provedor.name)
            setshowInfosToEdit(true);
            return;
        }

    }

    const editProvedor = async () => {
        const data = await api.editProvedor(idForEditProvedor, inputNameEditProvedor);
        if (data) {
            console.log(data);
            setshowInfosToEdit(false);
        }
        getProvedores();
        navigate('/provedores'); //refreshing the page to see edited item.
    }

    const excludeProvedor = async () => {
        const data = await api.deleteOneProvedor(idForEditProvedor);
        if(data){
            console.log(data);
            setExcludingProvedor(false);
        }
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
                    <button onClick={showExcludeProvedor}>Excluir</button>

                    {/* Add Provedor Form */}
                    {addingProvedor && <div className="newProvedorForm">
                    <h2>Adicionar um Provedor</h2>
                        <input type="text" placeholder="Informe o nome do novo provedor" onChange={handleChangeInputNameProvedor} />
                        <button onClick={addProvedor}>Adicionar provedor</button>
                        <button onClick={() => setAddingProvedor(false)}>Fechar</button>
                    </div>}

                    {/* Edit Provedor Form */}
                    {edittingProvedor && <div className="editProvedorForm">
                        <h2>Editando um provedor</h2>
                        <label>ID:
                            <input type="number" className="inputNumberIDEditProvedor" onChange={handleChangeInputIDForEditProvedor} onKeyUp={searchOneProvedor} />
                        </label>
                        <h3>{nameProvedor}</h3>
                        {showInfosToEdit &&
                            <div>
                                <input type="text" onChange={handleChangeInputEditNameProvedor} />
                                <button onClick={editProvedor}>Confirmar</button>
                            </div>}
                        <button onClick={() => setEdittingProvedor(false)}>Fechar</button>
                    </div>}

                    {/* Excluding Provedor */}
                    {excludingProvedor && <div className="excludingProvedorForm">
                        <h2>Excluir Provedor</h2>
                        <label>ID:
                            <input type="number" className="inputNumberIDExcludeProvedor"  onChange={handleChangeInputIDForEditProvedor} onKeyUp={searchOneProvedor} />
                        </label>
                        <h3>{nameProvedor}</h3>
                        <button onClick={excludeProvedor}>Excluir provedor</button>
                        <button onClick={() => setAddingProvedor(false)}>Fechar</button>
                    </div>}


                </div>
            </div>
        </>
    )
}