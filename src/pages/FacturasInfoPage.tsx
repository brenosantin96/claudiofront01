import { Navbar } from '../components/Navbar';
import '../index.css'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { ChangeEvent, useEffect, useState } from 'react';
import { Navbar2 } from '../components/Navbar2';
import { FacturaType, FacturaTypeWithConductorAndProveedor } from '../types/FacturaType'
import Select from 'react-select';
import { ConductorType } from '../types/ConductorType'
import { ProvedorType } from '../types/ProvedorType'
import { ObraType } from '../types/ObraType'
import { formatDate } from '../helpers/helperDate'
import { convertToMoney } from '../helpers/convertNumbers'


export const FacturasInfoPage = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [facturaInfo, setFacturaInfo] = useState<FacturaType>();
  const [facturas, setFacturas] = useState<FacturaTypeWithConductorAndProveedor[]>([])

  //Booleans
  const [readOnlyBoolean, setreadOnlyBoolean] = useState(true);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
  const [booleanConfirmationExclude, setBooleanConfirmationExclude] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  //Getting Foreing Keys.
  const [proveedores, setProveedores] = useState<ProvedorType[]>([])
  const [obras, setObras] = useState<ObraType[]>([])
  const [conductores, setConductores] = useState<ConductorType[]>([]);

  //Fields
  const [numberFactura, setNumberFactura] = useState(0);
  const [dateFactura, setDateFactura] = useState(new Date());
  const [priceFactura, setPriceFactura] = useState(0);
  const [provedorFactura, setProvedorFactura] = useState<ProvedorType>();
  const [obraFactura, setObraFactura] = useState<ObraType>();
  const [conductorFactura, setConductorFactura] = useState<ConductorType>();


  useEffect(() => {
    getFacturaInfo();
    getObras();
    getProveedores();
    getConductores();
  }, []);

  ////////////////////////////////////////////////////////////////////////


  //GETTING ALL INFO
  const getFacturaInfo = async () => {
    if (params.id) {
      let response = await api.getOneFactura(parseInt(params.id));
      if (response) {
        let factura = response.factura;
        console.log(factura);
        setFacturaInfo(factura);
        return;
      }
      else {
        alert("Factura no encontrada")
        return;
      }

    }
  }


  const getFacturaAllInfo = async () => {
    if (params.id) {
      let response = await api.getFacturasAllInfo(parseInt(params.id));
      if (response) {
        let factura = response.factura;
        console.log(factura);
        setFacturaInfo(factura);
        return;
      }
      else {
        alert("Factura no encontrada")
        return;
      }

    }
  }



  let getObras = async () => {
    await api.getAllObras()
      .then((response) => {
        setObras(response);
      })
      .then(() => {

      })
  }

  let getProveedores = async () => {
    return await api.getAllProvedores()
      .then((response) => {
        setProveedores(response);
      }).then(() => { })
  }

  let getConductores = async () => {
    return await api.getAllConductores()
      .then((response) => {
        setConductores(response);
      }).then(() => { })
  }

  ////////////////////////////////////////////////////////////


  //Booleans y Handlers
  const showConfirmationExclude = () => {
    setBooleanConfirmationExclude(!booleanConfirmationExclude)
  }

  //Buttons
  const startEdditingFactura = () => {
    setDisabledButtonSave(!disabledButtonSave);
    setDisabledButtonEdit(!disabledButtonEdit);
    setIsHidden(!isHidden)
    setreadOnlyBoolean(false);

    //ao clicar para adicionar fatura, faz um map em proveedores adicionando value e label para exibir no select.
    let optionsProveedores = proveedores.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));
    let optionsObras = obras.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));
    let optionsConductores = conductores.map(obj => ({ ...obj, value: obj.id.toString(), label: obj.name }));

    setProveedores(optionsProveedores);
    setConductores(optionsConductores);
    setObras(optionsObras);
  }


  /*   number: number;
    dateFactura: Date;
    valor: number;
    ProvedorId: number;
    ObraId: number;
    ConductorId: number; */


  //Handling Inputs

  const handleNumberFacturaInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberFactura(parseInt(e.target.value));
    if (facturaInfo) {
      setFacturaInfo({
        id: facturaInfo.id, number: parseInt(e.target.value), valor: facturaInfo.valor,
        dateFactura: facturaInfo.dateFactura, ConductorId: facturaInfo.ConductorId, ObraId: facturaInfo.ObraId, ProvedorId: facturaInfo.ProvedorId
      })
    }
  }

  const handleDateFactura = (e: ChangeEvent<HTMLDataElement>) => {

    let date = formatDate(e.target.value);

    if (date !== undefined) {
      setDateFactura(date);

      if (facturaInfo) {
        setFacturaInfo({
          id: facturaInfo.id, number: facturaInfo.number, valor: facturaInfo.valor,
          dateFactura: date, ConductorId: facturaInfo.ConductorId, ObraId: facturaInfo.ObraId, ProvedorId: facturaInfo.ProvedorId
        })
      }

    } else {
      console.log("Data nao informada corretamente.");
    }

  }



  const handlePriceFactura = (e: ChangeEvent<HTMLInputElement>) => {

    let facturaPriceFloat = parseFloat(e.target.value);
    console.log(facturaPriceFloat);

    setPriceFactura(facturaPriceFloat);
    console.log(priceFactura);
    //Doing this way for the reason that the user wants to keep the other informations.
    if (facturaInfo) {
      setFacturaInfo({
        id: facturaInfo.id, number: facturaInfo.number, valor: facturaPriceFloat,
        dateFactura: facturaInfo.dateFactura, ConductorId: facturaInfo.ConductorId, ObraId: facturaInfo.ObraId, ProvedorId: facturaInfo.ProvedorId
      })
    }
  }

  //Handle Selected Obra
  const HandleSelectedObra = (obj: any) => {
    setObraFactura(obj);
    console.log(obj);
  };

  //Handle Selected Proveedor
  const HandleSelectedProveedor = (obj: any) => {
    setProvedorFactura(obj);
    console.log(obj);
  };

  //Handle Selected Conductor
  const HandleSelectedConductor = (obj: any) => {
    setConductorFactura(obj);
    console.log(obj);
  };


  //Back function
  const backButton = async () => {
    navigate(-1);
  }

  //Functions to Edit, Save and Remove.

  const saveButton = async () => {

    if (facturaInfo) {
      //Doing this way for the reason that the user wants to keep the other informations.
      console.log("Valor facturaInfo", facturaInfo.valor);
      let response = await api.updateFactura(facturaInfo.id, facturaInfo.number, facturaInfo.dateFactura, facturaInfo.valor,
        provedorFactura?.id, obraFactura?.id, conductorFactura?.id)
      console.log(response);
    }
    setDisabledButtonEdit(!disabledButtonEdit);
    setDisabledButtonSave(!disabledButtonSave);
    setIsHidden(!isHidden);
    setreadOnlyBoolean(!readOnlyBoolean);
  }

  const delButton = async (id: number) => {
    if (facturaInfo) {
      let response = await api.removeFactura(id);
      console.log(response);
      backButton();
    }
  }

  return (
    <>
      <Navbar2 />
      <div className="container">

        {facturaInfo &&
          <div className='buttonsObraInfoItem d-flex justify-content-center mt-3'>
            <button onClick={startEdditingFactura} disabled={disabledButtonEdit} >Editar</button>
            <button onClick={showConfirmationExclude}>Eliminar</button>
            <button onClick={saveButton} disabled={disabledButtonSave}>Guardar</button>
            <button onClick={backButton}>Volver</button>
          </div>
        }

        <div className='containerInfoPage'>

          <div className="leftSideInfoPage">
            {facturaInfo &&

              <div className="table-responsive" style={{display: !isHidden ? "flex" : "none"}}>
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
                      <td>{facturaInfo.id}</td>
                    </tr>
                    <tr>
                      <td>Número</td>
                      <td>{facturaInfo.number}</td>
                    </tr>
                    <tr>
                      <td>Fecha</td>
                      <td>{facturaInfo.dateFactura.toString()}</td>
                    </tr>
                    <tr>
                      <td>Precio</td>
                      <td>{facturaInfo.valor}</td>
                    </tr>
                    <tr>
                      <td>Proveedor</td>
                      <td>{facturaInfo.ProvedorId}</td>
                    </tr>
                    <tr>
                      <td>Obra</td>
                      <td>{facturaInfo.ObraId}</td>
                    </tr>
                    <tr>
                      <td>Conductor</td>
                      <td>{facturaInfo.ConductorId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div>


          <div className="rightSideInfoPage">

            {facturaInfo &&
              <div className='infoItemEdit' style={{display: isHidden ? 'flex' : 'none' }}>

                <label htmlFor="idObra">ID:</label>
                <input type="number" readOnly={true} value={facturaInfo.id} name="idObra" />

                <label htmlFor="nameObra">Numero Factura:</label>
                <input type="number" readOnly={readOnlyBoolean}  value={facturaInfo.number} onChange={handleNumberFacturaInput} name="nameObra" />

                <label htmlFor="dateStartObra">Fecha Factura:</label>
                <input type="date" readOnly={readOnlyBoolean} placeholder="Fecha de compra de factura" onChange={handleDateFactura} />

                <label htmlFor="presupuestoObra">Precio Factura:</label>
                <input type="number" readOnly={readOnlyBoolean} value={facturaInfo.valor} onChange={handlePriceFactura} name="presupuestoObra" />

                <label htmlFor="obraFactura">Proveedor:</label>
                <Select isDisabled={readOnlyBoolean} className="inputsForm" placeholder="Proveedor" options={proveedores} onChange={HandleSelectedProveedor} />

                <label htmlFor="obraFactura">Obra:</label>
                <Select isDisabled={readOnlyBoolean} className="inputsForm" placeholder="Obra" options={obras} onChange={HandleSelectedObra} />

                <label htmlFor="obraFactura">Conductor:</label>
                <Select isDisabled={readOnlyBoolean} className="inputsForm" placeholder="Conductor" options={conductores} onChange={HandleSelectedConductor} />

                <br />
              </div>
            }

          </div>







          {booleanConfirmationExclude && facturaInfo &&
            <div>
              <h4 style={{ color: "white" }}>¿Realmente desea eliminar esta factura?</h4>
              <button onClick={() => delButton(facturaInfo.id)} >Eliminar</button>
            </div>
          }
        </div>
        <h3>{dateFactura.toString()}</h3>

      </div>
    </>
  )
}


/*  const changePresupuestoObraInput = (e: ChangeEvent<HTMLInputElement>) => {
   setEditInputPresupuestoObra(parseFloat(e.target.value));
   if (obraInfo) {
     setObraInfo({ id: obraInfo.id, name: obraInfo.name, direccion: obraInfo.direccion, presupuesto: parseFloat(e.target.value) })
   }
 } */
