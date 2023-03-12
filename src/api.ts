import axios from 'axios';
import env from 'dotenv';

const BASE = import.meta.env.VITE_APP_BASEURL as string


export const api = {

    getPing: async () => {

        let response = await axios.get(`${BASE}/ping`);
        return response.data;
    },

    getAllUsers: async () => {

        let response = await axios.get(`${BASE}/users`);
        return response.data;
    },

    signIn: async (email: string, password: string) => {

        let response = await axios.post(`${BASE}/login`, {
            email, password
        });
        return response.data;
    },

    getAllProvedores: async () => {

        let response = await axios.get(`${BASE}/provedores`);
        return response.data.provedores;

    },

    createProvedor: async (name: string) => {

        let response = await axios.post(`${BASE}/provedores`, {
            name
        });
        return response.data;

    },

    editProvedor: async (id: number, name?: string) => {

        let response = await axios.put(`${BASE}/provedores/${id}`, {
            name
        });
        return response.data;

    },

    GetOneProvedor: async (id: number) => {

        let response = await axios.get(`${BASE}/provedores/${id}`);
        return response.data;

    },

    deleteOneProvedor: async (id: number) => {
        let response = await axios.delete(`${BASE}/provedores/${id}`);
        return response.data;
    },


    //OBRAS

    getAllObras: async () => {

        let response = await axios.get(`${BASE}/obras`);
        return response.data.obras;

    },

    createObra: async (name: string, direccion: string, presupuesto?: number, dateStart?: Date) => {

        if (dateStart) {
            console.log(dateStart);
        }

        let response = await axios.post(`${BASE}/obras`, {
            name, direccion, presupuesto, dateStart
        });
        return response.data;

    },

    editObras: async (id: number, name?: string, direccion?: string, presupuesto?: number, dateStart?: Date) => {

        let response = await axios.put(`${BASE}/obras/${id}`, {
            name, direccion, presupuesto, dateStart
        });
        return response.data;

    },

    GetOneObra: async (id: number) => {

        let response = await axios.get(`${BASE}/obras/${id}`);
        return response.data;

    },

    deleteOneObra: async (id: number) => {
        let response = await axios.delete(`${BASE}/obras/${id}`);
        return response.data;
    },

    //CONDUCTORES

    getAllConductores: async () => {

        let response = await axios.get(`${BASE}/conductores`);
        return response.data.conductores;

    },

    createConductor: async (name: string, active: boolean) => {

        let response = await axios.post(`${BASE}/conductores`, {
            name, active
        });
        return response.data;

    },

    editConductor: async (id: number, name?: string, active?: boolean) => {

        let response = await axios.put(`${BASE}/conductores/${id}`, {
            name, active
        });
        return response.data;

    },

    GetOneConductor: async (id: number) => {

        let response = await axios.get(`${BASE}/conductores/${id}`);
        return response.data;

    },

    deleteConductor: async (id: number) => {
        let response = await axios.delete(`${BASE}/conductores/${id}`);
        return response.data;
    },

    //FACTURAS

    getFacturas: async () => {

        let response = await axios.get(`${BASE}/facturas`);
        return response.data.facturas;

    },

    getFacturasAllInfo: async () => {

        let response = await axios.get(`${BASE}/facturasAllInfo`);
        return response.data.facturasAllInfo;

    },

    getFacturasPaginated: async (page: number, limit: number) => {

        let response = await axios.get(`${BASE}/facturas2?page=${page}&limit=${limit}`);
        return response.data.paginatedResult;

    },

    getFacturaByID: async (id: number) => {

        let response = await axios.get(`${BASE}/facturasInfo/${id}`);
        return response.data.factura;

    },

    getFacturasByObraComplete: async (id: number) => {

        let response = await axios.get(`${BASE}/facturasByObraComplete/${id}`);
        return response.data;

    },


    getOneFactura: async (id: number) => {

        let response = await axios.get(`${BASE}/facturas/${id}`);
        return response.data;

    },

    createFacturas: async (number: number, dateFactura: Date, valor: number, ProvedorId: number, ObraId: number, ConductorId: number) => {

        let response = await axios.post(`${BASE}/facturas`, {
            number, dateFactura, valor, ProvedorId, ObraId, ConductorId
        });
        return response.data;

    },

    updateFactura: async (id: number, number?: number, dateFactura?: Date, valor?: number, ProvedorId?: number, ObraId?: number, ConductorId?: number) => {

        let response = await axios.put(`${BASE}/facturas/${id}`, {
            number, dateFactura, valor, ProvedorId, ObraId, ConductorId
            //1, data , valor, undefined, 10, undefined
        });
        return response.data;

    },

    removeFactura: async (id: number) => {

        let response = await axios.delete(`${BASE}/facturas/${id}`);
        return response.data;

    },

}