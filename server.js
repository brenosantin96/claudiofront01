const express = require('express');
const dot = require('dotenv');
const path = require('path')
const app = express();
const corsz = require('cors');
const { resolve } = require('path');

dot.config();


const port = process.env.PORT;

app.use(corsz);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(resolve(__dirname, './dist')));
}
//s


app.listen(port || 3000, (err) => {
    if (err) {
        console.log("ERRO: ", err)
    } else {
        console.log("Tudo funcionando.")
    }
})