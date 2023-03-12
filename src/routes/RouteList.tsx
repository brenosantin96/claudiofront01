import { useRoutes } from 'react-router-dom'
import Loginpage from '../pages/LoginPage';
import { Main } from "../pages/MainPage";
import { ObrasPage } from '../pages/Obras/ObrasPage';
import { ObraInfoPage } from '../pages/Obras/ObraInfoPage';
<<<<<<< HEAD
import { ConductoresPage } from '../pages/Conductores/ConductoresPage';
import { ConductoresInfoPage } from '../pages/Conductores/ConductoresInfoPage';
import { FacturasPage } from '../pages/Facturas/FacturasPage';
import { ProvedoresPage } from '../pages/Provedores/ProvedoresPage';
import { ProvedorInfoPage } from '../pages/Provedores/ProvedorInfoPage'
import { FacturasInfoPage } from '../pages/Facturas/FacturasInfoPage';
=======
import { FacturasPage } from '../pages/FacturasPage';
import { ProvedoresPage } from '../pages/Provedores/ProvedoresPage';
import { ProvedorInfoPage } from '../pages/Provedores/ProvedorInfoPage'
import { FacturasInfoPage } from '../pages/FacturasInfoPage';
>>>>>>> b3bcd87bd5ada4c91ac32e72c0aec4d88b52da74


export const RouteList = () => {

    return useRoutes([
        { path: '/', element: <Loginpage /> },
        { path: '/main', element: <Main /> },
        { path: '/obras', element: <ObrasPage /> },
        { path: '/obras/:id', element: <ObraInfoPage /> },
        { path: '/facturas', element: <FacturasPage /> },
        { path: '/facturas/:id', element: <FacturasInfoPage /> },
        { path: '/provedores', element: <ProvedoresPage /> },
        { path: '/provedores/:id', element: <ProvedorInfoPage /> },
<<<<<<< HEAD
        { path: '/conductores', element: <ConductoresPage /> },
        { path: '/conductores/:id', element: <ConductoresInfoPage /> },
=======
>>>>>>> b3bcd87bd5ada4c91ac32e72c0aec4d88b52da74
    ]);

}