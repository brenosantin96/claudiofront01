import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import corsz from 'cors'
import { resolve } from 'path'

dotenv.config();

//const port = import.meta.env.VITE_APP_PORT;

const app = express();

console.log("Batata");



app.use(corsz);

/* app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
}); */