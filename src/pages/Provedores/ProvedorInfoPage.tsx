import { Navbar } from '../../components/Navbar';
import '../../index.css'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { ChangeEvent, useEffect, useState } from 'react';
import { Navbar2 } from '../../components/Navbar2';

type Props = {
    id: number;
    name: string;
}

interface provedorInterface {
    id: number;
    name: string;
}


export const ProvedorInfoPage = ({ id, name }: Props) => {

    const params = useParams();
    const navigate = useNavigate();

    const [provedorInfo, setProvedorInfo] = useState<provedorInterface>();

    const [readOnlyBoolean, setreadOnlyBoolean] = useState(true);
    const [disabledButtonSave, setDisabledButtonSave] = useState(true);
    const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
    const [booleanConfirmationExclude, setBooleanConfirmationExclude] = useState(false);

    const [editInputNameProvedor, setEditInputNameProvedor] = useState('');

    useEffect(() => {
        getProvedorInfo();
    }, [])


    const getProvedorInfo = async () => {
        if (params.id) {
            let response = await api.GetOneProvedor(parseInt(params.id));
            if (response) {
                let provedor = response.provedor
                setProvedorInfo(provedor);
                console.log(provedor);
            }
            if (!response) {
                setProvedorInfo({ id: 0, name: "Não encontrado" })
            }

        }
    }

    //Booleans

    const showConfirmationExclude = () => {
        setBooleanConfirmationExclude(!booleanConfirmationExclude)
    }

    //Buttons
    const startEdditingProvedor = () => {
        setDisabledButtonSave(!disabledButtonSave);
        setDisabledButtonEdit(!disabledButtonEdit);
        setreadOnlyBoolean(false);
    }

    //Inputs
    const changeNameProvedorInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEditInputNameProvedor(e.target.value);
    }

    //SaveFunction

    const saveButtonEdit = async (id: number, name: string) => {
        let response = await api.editProvedor(id, name)
        if (response) {
            console.log("Editado com sucesso", response);
            setDisabledButtonEdit(!disabledButtonEdit);
            setDisabledButtonSave(!disabledButtonSave);
            setreadOnlyBoolean(!readOnlyBoolean);
        }
    }

    //Delete Function

    const executeDeleteProvedor = async (id: number)=>{
        let response = await api.deleteOneProvedor(id);
        if(response) {
            console.log("excluido com sucesso", response);
            navigate('/provedores');
        }
    }

    const backButton = async() => {
        navigate(-1);
    }

    return (
        <>
            <Navbar2 />
            <h3 className='tituloProvedorInfoPage'>Datos del Provedor</h3>
            <div className='containerProvedorInfoItemPage'>

                {provedorInfo &&
                    <div className='buttonsProvedorInfoItem'>
                        <button onClick={startEdditingProvedor} disabled={disabledButtonEdit} >Editar</button>
                        <button onClick={showConfirmationExclude}>Eliminar</button>
                        <button onClick={() => saveButtonEdit(provedorInfo.id, editInputNameProvedor)} disabled={disabledButtonSave}>Guardar</button>
                        <button onClick={backButton}>Volver</button>
                    </div>
                }

                {provedorInfo &&
                    <div className='infosProvedorInfoItem'>
                        <label htmlFor="idProvedor">ID:</label>
                        <input type="number" readOnly={true} value={provedorInfo.id} name="idProvedor" />
                        <label htmlFor="nameProvedor">Nome:</label>
                        <input type="text" readOnly={readOnlyBoolean} placeholder={provedorInfo.name} value={editInputNameProvedor} onChange={changeNameProvedorInput} name="nameProvedor" />
                        <br />
                    </div>
                }
            </div>
            {booleanConfirmationExclude && provedorInfo &&
                <div>
                    <h4 style={{color: "white"}}>¿Realmente desea eliminar este proveedor?</h4>
                    <button onClick={()=> executeDeleteProvedor(provedorInfo.id)} >Eliminar</button>
                </div>
            }

            
        </>
    )
}