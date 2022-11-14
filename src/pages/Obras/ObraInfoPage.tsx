import { Navbar } from '../../components/Navbar';
import '../../index.css'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { ChangeEvent, useEffect, useState } from 'react';
import { Navbar2 } from '../../components/Navbar2';
import { ExpensesObraComponent } from '../../components/obras/ExpensesObraComponent'

interface ObraInterface {
  id: number;
  name: string;
  direccion?: string;
  presupuesto?: number;
  dateStart?: Date;
}


export const ObraInfoPage = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [obraInfo, setObraInfo] = useState<ObraInterface>();

  //Booleans
  const [readOnlyBoolean, setreadOnlyBoolean] = useState(true);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
  const [booleanConfirmationExclude, setBooleanConfirmationExclude] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  //Fields
  const [editInputNameObra, setEditInputNameObra] = useState('');
  const [editInputDireccionObra, setEditInputDireccionObra] = useState('');
  const [editInputPresupuestoObra, setEditInputPresupuestoObra] = useState(0);
  const [dateStartObra, setDateStartObra] = useState(new Date());

  useEffect(() => {
    getObraInfo();
  }, []);

  //
  const getObraInfo = async () => {
    if (params.id) {
      let response = await api.GetOneObra(parseInt(params.id));
      if (response) {
        let obra = response.obra;
        setObraInfo(obra);
      }
      if (!response) {
        setObraInfo({ id: 0, name: "Não encontrado", direccion: "Não encontrado" })
      }

    }
  }

  //Booleans y Handlers

  const showConfirmationExclude = () => {
    setBooleanConfirmationExclude(!booleanConfirmationExclude)
  }

  //Buttons
  const startEdditingProvedor = () => {

    if (obraInfo) {
      //name
      setEditInputNameObra(obraInfo.name)
      //direcion
      if (obraInfo.direccion) {
        setEditInputDireccionObra(obraInfo.direccion)
      }
      if (obraInfo.presupuesto) {
        setEditInputPresupuestoObra(obraInfo.presupuesto)
      }
      if (obraInfo.dateStart) {
        setDateStartObra(obraInfo.dateStart)
      }
    }

    setDisabledButtonSave(!disabledButtonSave);
    setDisabledButtonEdit(!disabledButtonEdit);
    setIsHidden(!isHidden)
    setreadOnlyBoolean(false);
  }

  //Handling Inputs
  const changeNameObraInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInputNameObra(e.target.value);
  }

  const changeDireccionObraInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInputDireccionObra(e.target.value);
  }

  const changePresupuestoObraInput = (e: ChangeEvent<HTMLInputElement>) => {

    let pricePresupuesto = parseFloat(e.target.value);
    setEditInputPresupuestoObra(pricePresupuesto);

    if (obraInfo) {
      setObraInfo({ id: obraInfo.id, name: obraInfo.name, direccion: obraInfo.direccion, presupuesto: pricePresupuesto })
    }
  }

  const changeDateObraInput = (e: ChangeEvent<HTMLDataElement>) => {

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
      setDateStartObra(dateStarted);

    }
  }


  //Back function
  const backButton = async () => {
    navigate(-1);
  }

  //Functions to Edit, Save and Remove.

  const saveButton = async () => {
    if (obraInfo) {
      let response = await api.editObras(obraInfo.id, editInputNameObra, editInputDireccionObra, editInputPresupuestoObra, dateStartObra)
      console.log(response);
      setObraInfo(response.obra)
    }
    setDisabledButtonEdit(!disabledButtonEdit);
    setDisabledButtonSave(!disabledButtonSave);
    setIsHidden(!isHidden);
    setreadOnlyBoolean(!readOnlyBoolean);

  }

  const delButton = async (id: number) => {
    if (obraInfo) {
      let response = await api.deleteOneObra(id)

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

        {obraInfo &&
          <div className='buttonsObraInfoItem d-flex justify-content-center mt-3'>
            <button onClick={startEdditingProvedor} disabled={disabledButtonEdit} >Editar</button>
            <button onClick={showConfirmationExclude}>Eliminar</button>
            <button onClick={saveButton} disabled={disabledButtonSave}>Guardar</button>
            <button onClick={backButton}>Volver</button>
          </div>
        }



        <div className='containerInfoPage'>

          <div className="leftSideInfoPage">
            {obraInfo &&

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
                      <td>{obraInfo.id}</td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>{obraInfo.name}</td>
                    </tr>
                    <tr>
                      <td>Dirección</td>
                      <td>{obraInfo.direccion}</td>
                    </tr>
                    <tr>
                      <td>Precio</td>
                      <td>{obraInfo.presupuesto ? obraInfo.presupuesto : 0}</td>
                    </tr>
                    <tr>
                      <td>Fecha Inicio</td>
                      <td>{obraInfo.dateStart ? obraInfo.dateStart.toString() : "Ss"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div>

          <div className="rightSideInfoPage">
            {obraInfo &&
              <div className='infoItemEdit' style={{ display: isHidden ? "flex" : "none" }}>
                <label htmlFor="idObra">ID:</label>
                <input type="number" readOnly={true} value={obraInfo.id} name="idObra" />
                <label htmlFor="nameObra">Nombre:</label>
                <input type="text" readOnly={readOnlyBoolean} value={editInputNameObra} onChange={changeNameObraInput} name="nameObra" />
                <label htmlFor="direccionObra">Direccion:</label>
                <input type="text" readOnly={readOnlyBoolean} value={editInputDireccionObra} onChange={changeDireccionObraInput} name="direccionObra" />
                <label htmlFor="presupuestoObra">Presupuesto:</label>
                <input type="number" readOnly={readOnlyBoolean} value={editInputPresupuestoObra} onChange={changePresupuestoObraInput} name="presupuestoObra" />
                <label htmlFor="dateStartObra">Fecha inicio:</label>
                <input type="date" readOnly={readOnlyBoolean} max={"9999-12-31"} placeholder="Fecha de inicio" onChange={changeDateObraInput} />
                <br />
              </div>
            }
          </div>




          {booleanConfirmationExclude && obraInfo &&
            <div>
              <h4 style={{ color: "#000000" }}>¿Realmente desea eliminar esta obra?</h4>
              <button onClick={() => delButton(obraInfo.id)} >Eliminar</button>
            </div>
          }
        </div>


        {obraInfo &&
          < ExpensesObraComponent idObra={obraInfo.id} />
        }

      </div>
    </>
  )
}