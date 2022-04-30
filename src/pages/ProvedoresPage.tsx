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
            <Navbar />
            <div className="containerProvedores">
                <div className="leftSideProvedores">
                    {provedoresInfo.map((item) => (<Provedor id={item.id} name={item.name}></Provedor>))}
                </div>
                <div className="rightSideProvedores">
                    <button onClick={showAddProvedor}>Add provedor</button>
                    {addingProvedor && <div>
                        <input type="text" onChange={handleChangeInputNameProvedor} />
                        <button onClick={addProvedor}>Adicionar provedor!</button>
                    </div>}
                </div>
            </div>
        </>
    )
}