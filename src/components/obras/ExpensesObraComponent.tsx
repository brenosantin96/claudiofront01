import React, { useState, useEffect } from 'react'
import { api } from '../../api';
import { FacturaType, FacturaTypeWithConductorAndProveedor } from '../../types/FacturaType';
import { ObraType } from '../../types/ObraType';


type PropsExpenses = {
    idObra: number;
}


export const ExpensesObraComponent = ({ idObra }: PropsExpenses) => {

    const [facturas, setFacturas] = useState<FacturaTypeWithConductorAndProveedor[]>([])
    const [filteredFacturas, setFilteredFacturas] = useState<FacturaType[]>([])
    const [totalFacturas, setTotalFacturas] = useState(0);
    const [obras, setObras] = useState<ObraType[]>([])

    useEffect(() => {
        getAllFacturasByObra();
    }, [])

    useEffect(()=> {
        getTotalValueFacturasByObra();
    }, [facturas])


    //To get All Facturas

    const getAllFacturasByObra = async () => {
        let faturas: FacturaTypeWithConductorAndProveedor[] = await api.getFacturasByObraComplete(idObra);
        if (faturas) {
            setFacturas(faturas);
            console.log(faturas)
        }
    }

    const getTotalValueFacturasByObra = async () => {
        if (facturas) {
            const sum = facturas.reduce((accumulator, item) => {
                return accumulator + item.valor;
            }, 0);
            setTotalFacturas(sum);

        } else {
            return 0;
        }
    }



    return (
        <div className='container'>
            <div className="table-responsive">
                <table className='table table-sm table-hover'>
                    <thead>
                        <tr>
                            <th>Proveedor</th>
                            <th>Fecha</th>
                            <th>Número</th>
                            <th>Conductor</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map((factura) => (
                            <tr key={factura.id}>
                                <td>{factura.Provedor.name}</td>
                                <td>{factura.dateFactura.toString()}</td>
                                <td>{factura.number}</td>
                                <td>{factura.Conductor.name}</td>
                                <td>{factura.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td>{totalFacturas}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

