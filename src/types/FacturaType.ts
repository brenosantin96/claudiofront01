import { ConductorType } from "./ConductorType";
import { ProvedorType } from "./ProvedorType";

export type FacturaType = {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    ProvedorId: number;
    ObraId: number;
    ConductorId: number;

}

export type FacturaTypeWithConductorAndProveedor = {
    id: number;
    number: number;
    dateFactura: Date;
    valor: number;
    ProvedorId: number;
    ObraId: number;
    ConductorId: number;
    Conductor: ConductorType;
    Provedor: ProvedorType

}