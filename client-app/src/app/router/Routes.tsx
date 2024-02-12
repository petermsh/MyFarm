import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/users/LoginForm";
import FarmDashboard from "../../features/farms/dashboard/FarmDashboard";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import FarmDetails from "../../features/farms/details/FarmDetails";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            
            {path: 'farms', element: <FarmDashboard />},
            {path: 'farms/:id', element: <FarmDetails />},
            
            {path: 'signIn', element: <LoginForm />},
            
            
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to={'/not-found'} />},
        ]
    },
]

export const router = createBrowserRouter(routes);