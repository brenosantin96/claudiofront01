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
        getAllFacturasByObra();

    }, [])


    //To get All Facturas

    const getAllFacturasByObra = async () => {
        let faturas = await api.getFacturasByObra(idObra);
        console.log(faturas)
        if (faturas) {
            //setFacturas(faturas);
        }
    }


    return (
        <div className='containerExpenses'>
            <h2>ID da obra pego: {idObra}</h2>
            
        </div>
    )
}


/* {facturas &&
    <div>
        {facturas.map((item) => (<div key={item.id}>{`${item.number} - ${item.dateFactura.toString()} - ${item.valor}`}</div>))}
    </div>
} */