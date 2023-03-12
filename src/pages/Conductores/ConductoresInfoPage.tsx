import { Navbar2 } from '../../components/Navbar2';
import '../../index.css'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { ChangeEvent, useEffect, useState } from 'react';
import { ConductorType } from '../../types/ConductorType'


export const ConductoresInfoPage = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [conductorInfo, setConductorInfo] = useState<ConductorType>();

  //Booleans
  const [readOnlyBoolean, setreadOnlyBoolean] = useState(true);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
  const [booleanConfirmationExclude, setBooleanConfirmationExclude] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  //Fields
  const [editInputNameConductor, setInputNameConductor] = useState('');
  const [editActiveConductor, setEditActiveConductor] = useState(false);


  useEffect(() => {
    getConductorInfo();
  }, []);

  //
  const getConductorInfo = async () => {
    if (params.id) {
      let response = await api.GetOneConductor(parseInt(params.id));
      if (response) {
        let conductor = response.conductor;
        setConductorInfo(conductor);
      }
      if (!response) {
        setConductorInfo({ id: 0, name: "Não encontrado", active: false })
      }

    }
  }

  //Booleans y Handlers

  const showConfirmationExclude = () => {
    setBooleanConfirmationExclude(!booleanConfirmationExclude)
  }

  //Buttons
  const startEdditingConductor = () => {

    if (conductorInfo) {
      //name
      setInputNameConductor(conductorInfo.name)
      //active
      if (conductorInfo.active) {
        setEditActiveConductor(conductorInfo.active)
      }
    }

    setDisabledButtonSave(!disabledButtonSave);
    setDisabledButtonEdit(!disabledButtonEdit);
    setIsHidden(!isHidden)
    setreadOnlyBoolean(false);
  }

  //Handling Inputs
  const changeNameConductorInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNameConductor(e.target.value);
  }

  const changeStatusActiveConductor = (e: ChangeEvent<HTMLInputElement>) => {
    setEditActiveConductor(e.target.checked);
  }


  //Back function
  const backButton = async () => {
    navigate(-1);
  }

  //Functions to Edit, Save and Remove.

  const saveButton = async () => {
    if (conductorInfo) {
      let response = await api.editConductor(conductorInfo.id, editInputNameConductor, editActiveConductor)
      setConductorInfo(response.conductor)
    }
    setDisabledButtonEdit(!disabledButtonEdit);
    setDisabledButtonSave(!disabledButtonSave);
    setIsHidden(!isHidden);
    setreadOnlyBoolean(!readOnlyBoolean);

  }

  const delButton = async (id: number) => {
    if (conductorInfo) {
      let response = await api.deleteConductor(id)

      if (response.error) {
        alert(response.error);
        backButton();
      } else {
        backButton();
      }

    }
  }

  return (
    <>
      <Navbar2 />
      <div className="container">

        {conductorInfo &&
          <div className='buttonsObraInfoItem d-flex justify-content-center mt-3'>
            <button onClick={startEdditingConductor} disabled={disabledButtonEdit} >Editar</button>
            <button onClick={showConfirmationExclude}>Eliminar</button>
            <button onClick={saveButton} disabled={disabledButtonSave}>Guardar</button>
            <button onClick={backButton}>Volver</button>
          </div>
        }



        <div className='containerInfoPage'>

          <div className="leftSideInfoPage">
            {conductorInfo &&

              <div className="table-responsive" style={{ display: !isHidden ? "flex" : "none" }}>
                <table className='table table-sm table-hover '>
                  <thead>
                    <tr>
                      <th>Descripción</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{conductorInfo.id}</td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>{conductorInfo.name}</td>
                    </tr>
                    <tr>
                      <td>Activo</td>
                      <td>{conductorInfo.active.toString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div>

          <div className="rightSideInfoPage">
            {conductorInfo &&
              <div className='infoItemEdit' style={{ display: isHidden ? "flex" : "none" }}>
                <label htmlFor="idConductor">ID:</label>
                <input type="number" readOnly={true} value={conductorInfo.id} name="idObra" />
                <label htmlFor="nameConductor">Nombre:</label>
                <input type="text" readOnly={readOnlyBoolean} value={editInputNameConductor} onChange={changeNameConductorInput} name="nameObra" />
                <label htmlFor="direccionObra">Activo:</label>
                <input type="checkbox" readOnly={readOnlyBoolean} onChange={changeStatusActiveConductor} name="direccionObra" />
                <br />
              </div>
            }
          </div>


          {booleanConfirmationExclude && conductorInfo &&
            <div>
              <h4 style={{ color: "#000000" }}>¿Realmente desea eliminar este conductor?</h4>
              <button onClick={() => delButton(conductorInfo.id)} >Eliminar</button>
            </div>
          }
        </div>

      </div>
    </>
  )
}