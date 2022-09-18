const express = require('express');
const dot = require('dotenv');
const path = require('path')
const app = express();
dot.config();


app.use(express.static(path.join(__dirname, '../dist')));

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log("ERRO: ", err)
    } else {
        console.log("Tudo funcionando.")
    }
})