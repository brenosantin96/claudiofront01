import axios from 'axios';
const BASE = 'http://localhost:4000';


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

    createProvedor: async (name : string) => {

        let response = await axios.post(`${BASE}/provedores`);
        return response.data;

    }

}