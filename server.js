const express = require('express');
const dot = require('dotenv');
const path = require('path')
const app = express();
const corsz = require('cors');
const { resolve } = require('path');

dot.config();

console.log("Batata");

const port =
    import.meta.env.VITE_APP_PORT;

app.use(corsz);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(resolve(__dirname, './dist')));
}



app.listen(port || 3000, (err) => {
    if (err) {
        console.log("ERRO: ", err)
    } else {
        console.log("Tudo funcionando.")
    }
})