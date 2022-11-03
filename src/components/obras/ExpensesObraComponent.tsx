import React, { useState, useEffect } from 'react'
import { api } from '../../api';
import { FacturaType } from '../../types/FacturaType';
import { ObraType } from '../../types/ObraType';

type PropsExpenses = {
    idObra: number;
}


export const ExpensesObraComponent = ({ idObra }: PropsExpenses) => {

    const [facturas, setFacturas] = useState<FacturaType[]>([])
    const [filteredFacturas, setFilteredFacturas] = useState<FacturaType[]>([])
    const [obras, setObras] = useState<ObraType[]>([])

    useEffect(() => {
        getAllFacturas();

    }, [])


    //To get All Facturas

    const getAllFacturas = async () => {
        let faturas = await api.getFacturas();

        if (faturas) {
            setFacturas(faturas);
        }
    }


    return (
        <div className='containerExpenses'>
            {facturas &&
                <div>
                    {facturas.map((item) => (<div key={item.id}>{`${item.number} - ${item.dateFactura.toString()} - ${item.valor}`}</div>))}
                </div>
            }
        </div>
    )
}
