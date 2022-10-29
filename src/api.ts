import axios from 'axios';
import env from 'dotenv';

const BASE = "http://localhost:4000"


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

    //FACTURAS

    getFacturas: async () => {

        let response = await axios.get(`${BASE}/facturas`);
        return response.data.facturas;

    },

    createFacturas: async (number: number, dateFactura: Date, valor: number, ProvedorId: number, ObraId: number, ConductorId: number) => {

        let response = await axios.post(`${BASE}/facturas`, {
            number, dateFactura, valor, ProvedorId, ObraId, ConductorId
        });
        return response.data;

    },

}