import axios from 'axios';
import env from 'dotenv';

env.config();

const api_configs = {
    BASE: import.meta.env.VITE_BASEAPI || 'https://claudioback01.herokuapp.com/',
  }


export const api = {

    getPing: async () => {

        let response = await axios.get(`${api_configs.BASE}/ping`);
        return response.data;
    },

    getAllUsers: async () => {

        let response = await axios.get(`${api_configs.BASE}/users`);
        return response.data;
    },

    signIn: async (email: string, password: string) => {

        let response = await axios.post(`${api_configs.BASE}/login`, {
            email, password
        });
        return response.data;
    },

    getAllProvedores: async () => {

        let response = await axios.get(`${api_configs.BASE}/provedores`);
        return response.data.provedores;

    },

    createProvedor: async (name: string) => {

        let response = await axios.post(`${api_configs.BASE}/provedores`, {
            name
        });
        return response.data;

    },

    editProvedor: async (id: number, name?: string) => {

        let response = await axios.put(`${api_configs.BASE}/provedores/${id}`, {
            name
        });
        return response.data;

    },

    GetOneProvedor: async (id: number) => {

        let response = await axios.get(`${api_configs.BASE}/provedores/${id}`);
        return response.data;

    },

    deleteOneProvedor: async (id: number) => {
        let response = await axios.delete(`${api_configs.BASE}/provedores/${id}`);
        return response.data;
    },


    //OBRAS

    getAllObras: async () => {

        let response = await axios.get(`${api_configs.BASE}/obras`);
        return response.data.obras;

    },

    createObra: async (name: string, direccion: string, presupuesto?: number, dateStart?: Date) => {

        if(dateStart){
            console.log(dateStart);
        }

        let response = await axios.post(`${api_configs.BASE}/obras`, {
            name, direccion, presupuesto, dateStart
        });
        return response.data;

    },

    editObras: async (id: number, name?: string, direccion?: string, presupuesto?: number, dateStart?: Date) => {

        let response = await axios.put(`${api_configs.BASE}/obras/${id}`, {
            name, direccion, presupuesto, dateStart
        });
        return response.data;

    },

    GetOneObra: async (id: number) => {

        let response = await axios.get(`${api_configs.BASE}/obras/${id}`);
        return response.data;

    },

    deleteOneObra: async (id: number) => {
        let response = await axios.delete(`${api_configs.BASE}/obras/${id}`);
        return response.data;
    },

    //FACTURAS

    getFacturas: async () => {

        let response = await axios.get(`${api_configs.BASE}/facturas`);
        return response.data.facturas;

    },

}