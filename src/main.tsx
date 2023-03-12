import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/MainPage";
import { ObrasPage } from './pages/Obras/ObrasPage';
import { FacturasPage } from './pages/Facturas/FacturasPage';
import { ProvedoresPage } from './pages/Provedores/ProvedoresPage';
import {RouteList} from './routes/RouteList'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  </React.StrictMode>
)
