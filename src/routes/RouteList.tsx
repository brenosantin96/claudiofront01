import { useRoutes } from 'react-router-dom'
import Loginpage from '../pages/LoginPage';
import { Main } from "../pages/MainPage";
import { ObrasPage } from '../pages/ObrasPage';
import { FacturasPage } from '../pages/FacturasPage';
import { ProvedoresPage } from '../pages/ProvedoresPage';


export const RouteList = () => {
    
    return useRoutes([
        { path: '/', element: <Loginpage /> },
        { path: '/main', element: <Main/> },
        { path: '/obras', element: <ObrasPage /> },
        { path: '/facturas', element: <FacturasPage /> },
        { path: '/provedores', element: <ProvedoresPage /> },
    ]);

}