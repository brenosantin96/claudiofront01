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
        console.log(obra);
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
    setDisabledButtonSave(!disabledButtonSave);
    setDisabledButtonEdit(!disabledButtonEdit);
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
    setEditInputPresupuestoObra(parseFloat(e.target.value));
    if (obraInfo) {
      setObraInfo({ id: obraInfo.id, name: obraInfo.name, direccion: obraInfo.direccion, presupuesto: parseFloat(e.target.value) })
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
    }
    setDisabledButtonEdit(!disabledButtonEdit);
    setDisabledButtonSave(!disabledButtonSave);
    setreadOnlyBoolean(!readOnlyBoolean);
  }

  const delButton = async (id: number) => {
    if (obraInfo) {
      let response = await api.deleteOneObra(id);
      console.log(response);
      backButton();
    }
  }

  return (
    <>
      <Navbar2 />
      <h3 className='tituloObraInfoPage'>Datos de la Obra</h3>
      <div className='containerObraInfoItemPage'>

        {obraInfo &&
          <div className='buttonsObraInfoItem'>
            <button onClick={startEdditingProvedor} disabled={disabledButtonEdit} >Editar</button>
            <button onClick={showConfirmationExclude}>Eliminar</button>
            <button onClick={saveButton} disabled={disabledButtonSave}>Guardar</button>
            <button onClick={backButton}>Volver</button>
          </div>
        }

        {obraInfo &&
          <div className='infosObraInfoItem'>
            <label htmlFor="idObra">ID:</label>
            <input type="number" readOnly={true} value={obraInfo.id} name="idObra" />
            <label htmlFor="nameObra">Nombre:</label>
            <input type="text" readOnly={readOnlyBoolean} placeholder={obraInfo.name} value={editInputNameObra} onChange={changeNameObraInput} name="nameObra" />
            <label htmlFor="direccionObra">Direccion:</label>
            <input type="text" readOnly={readOnlyBoolean} placeholder={obraInfo.direccion} value={editInputDireccionObra} onChange={changeDireccionObraInput} name="direccionObra" />
            <label htmlFor="presupuestoObra">Presupuesto:</label>
            <input type="number" readOnly={readOnlyBoolean} value={obraInfo.presupuesto} onChange={changePresupuestoObraInput} name="presupuestoObra" />
            <label htmlFor="dateStartObra">Fecha inicio:</label>
            <input type="date" readOnly={readOnlyBoolean} placeholder="Fecha de inicio" onChange={changeDateObraInput} />
            <br />
          </div>
        }


        {booleanConfirmationExclude && obraInfo &&
          <div>
            <h4 style={{ color: "white" }}>¿Realmente desea eliminar esta obra?</h4>
            <button onClick={() => delButton(obraInfo.id)} >Eliminar</button>
          </div>
        }
      </div>

      {obraInfo &&
        < ExpensesObraComponent idObra={obraInfo.id} />
      }
    </>
  )
}