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


export const ProvedorInfoPage = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [provedorInfo, setProvedorInfo] = useState<provedorInterface>();

    const [readOnlyBoolean, setreadOnlyBoolean] = useState(true);
    const [disabledButtonSave, setDisabledButtonSave] = useState(true);
    const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
    const [booleanConfirmationExclude, setBooleanConfirmationExclude] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

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
        if (provedorInfo) {
            setEditInputNameProvedor(provedorInfo.name)
        }
        setDisabledButtonSave(!disabledButtonSave);
        setDisabledButtonEdit(!disabledButtonEdit);
        setIsHidden(!isHidden)
        setreadOnlyBoolean(false);
    }

    //Inputs
    const changeNameProvedorInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEditInputNameProvedor(e.target.value);
    }

    //SaveFunction
    const saveButton = async () => {

        if (provedorInfo) {
            let response = await api.editProvedor(provedorInfo.id, editInputNameProvedor)
            console.log(response);
            setProvedorInfo(response.provedor)
        }
        setDisabledButtonEdit(!disabledButtonEdit);
        setDisabledButtonSave(!disabledButtonSave);
        setIsHidden(!isHidden);
        setreadOnlyBoolean(!readOnlyBoolean);

    }

    //Delete Function
    const delButton = async (id: number) => {
        if (provedorInfo) {
          let response = await api.deleteOneObra(id)
    
          if (response.error) {
            alert(response.error);
            backButton();
          } else {
            backButton();
          }
    
        }
      }

    //Back function
    const backButton = async () => {
        navigate(-1);
    }

    return (
        <>
            <Navbar2 />
            <div className="container">

                {provedorInfo &&
                    <div className='buttonsProvedorInfoItem d-flex justify-content-center mt-3'>
                        <button onClick={startEdditingProvedor} disabled={disabledButtonEdit} >Editar</button>
                        <button onClick={showConfirmationExclude}>Eliminar</button>
                        <button onClick={saveButton} disabled={disabledButtonSave}>Guardar</button>
                        <button onClick={backButton}>Volver</button>
                    </div>
                }


                <div className='containerInfoPage'>

                    <div className="leftSideInfoPage">
                        {provedorInfo &&

                            <div className="table-responsive" style={{ display: !isHidden ? "flex" : "none" }}>
                                <table className='table table-sm table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Descripción</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ID</td>
                                            <td>{provedorInfo.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Nome</td>
                                            <td>{provedorInfo.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>

                    <div className="rightSideInfoPage">
                        {provedorInfo &&
                            <div className='infoItemEdit' style={{ display: isHidden ? "flex" : "none" }}>
                                <label htmlFor="idProvedor">ID:</label>
                                <input type="number" readOnly={true} value={provedorInfo.id} name="idProvedor" />
                                <label htmlFor="nameProvedor">Nome:</label>
                                <input type="text" readOnly={readOnlyBoolean} value={editInputNameProvedor} onChange={changeNameProvedorInput} name="nameProvedor" />
                                <br />
                            </div>
                        }
                    </div>



                    {booleanConfirmationExclude && provedorInfo &&
                        <div>
                            <h4 style={{ color: "white" }}>¿Realmente desea eliminar este proveedor?</h4>
                            <button onClick={() => delButton(provedorInfo.id)} >Eliminar</button>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}