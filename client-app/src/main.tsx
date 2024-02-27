import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-calendar/dist/Calendar.css'
import {RouterProvider} from "react-router-dom";
import {store, StoreContext} from "./app/stores/store";
import {router} from "./app/router/Routes";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <RouterProvider router={router}/>
        </StoreContext.Provider>
    </React.StrictMode>,
)
