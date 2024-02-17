import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/users/LoginForm";
import FarmDashboard from "../../features/farms/dashboard/FarmDashboard";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import FarmDetails from "../../features/farms/details/FarmDetails";
import FarmForm from "../../features/farms/form/FarmForm";
import SeasonDashboard from "../../features/seasons/dashboard/SeasonDashboard";
import SeasonDetails from "../../features/seasons/details/SeasonDetails";
import SeasonForm from "../../features/seasons/form/SeasonForm";
import FieldDashboard from "../../features/fields/dashboard/FieldDashboard";
import FieldDetails from "../../features/fields/details/FieldDetails";
import FieldForm from "../../features/fields/form/FieldForm";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            
            {path: 'farms', element: <FarmDashboard />},
            {path: 'farms/:id', element: <FarmDetails />},
            {path: 'farms/create', element: <FarmForm key={'create'} />},
            {path: 'farms/update/:id', element: <FarmForm key={'update'} />},

            {path: 'seasons', element: <SeasonDashboard />},
            {path: 'seasons/:id', element: <SeasonDetails />},
            {path: 'seasons/create', element: <SeasonForm key={'create'} />},
            {path: 'seasons/update/:id', element: <SeasonForm key={'update'} />},

            {path: 'fields', element: <FieldDashboard />},
            {path: 'fields/:id', element: <FieldDetails />},
            {path: 'fields/create', element: <FieldForm key={'create'} />},
            {path: 'fields/update/:id', element: <FieldForm key={'update'} />},
            
            {path: 'signIn', element: <LoginForm />},
            
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to={'/not-found'} />},
        ]
    },
]

export const router = createBrowserRouter(routes);