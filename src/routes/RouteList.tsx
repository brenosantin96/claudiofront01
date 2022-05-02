import { useRoutes } from 'react-router-dom'
import Loginpage from '../pages/LoginPage';
import { Main } from "../pages/MainPage";
import { ObrasPage } from '../pages/Obras/ObrasPage';
import { ObraInfoPage } from '../pages/Obras/ObraInfoPage';
import { FacturasPage } from '../pages/FacturasPage';
import { ProvedoresPage } from '../pages/Provedores/ProvedoresPage';
import { ProvedorInfoPage } from '../pages/Provedores/ProvedorInfoPage'


export const RouteList = () => {

    return useRoutes([
        { path: '/', element: <Loginpage /> },
        { path: '/main', element: <Main /> },
        { path: '/obras', element: <ObrasPage /> },
        { path: '/obras/:id', element: <ObraInfoPage /> },
        { path: '/facturas', element: <FacturasPage /> },
        { path: '/provedores', element: <ProvedoresPage /> },
        { path: '/provedores/:id', element: <ProvedorInfoPage /> },
    ]);

}