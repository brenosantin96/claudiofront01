import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/MainPage";
import { ObrasPage } from './pages/ObrasPage';
import { FacturasPage } from './pages/FacturasPage';
import { ProvedoresPage } from './pages/ProvedoresPage';
import {RouteList} from './routes/RouteList'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  </React.StrictMode>
)
