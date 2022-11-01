import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import corsz from 'cors'
import { resolve } from 'path'

dotenv.config();


const app = express();

console.log("Batata");



app.use(corsz);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(resolve(__dirname, './dist')));
}


app.listen(
    import.meta.env.VITE_APP_PORT || 3000, (err) => {
        if (err) {
            console.log("ERRO: ", err)
        } else {
            console.log("Tudo funcionando.")
        }
    })