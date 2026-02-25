import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import ToDos, {loader as toDosLoader} from './routes/ToDos';
import NewToDo, {action as newToDoAction} from './routes/NewToDo';
import ToDoDetails, {loader as toDoDetailsLoader} from './routes/ToDoDetails';
import RootLayout from './routes/RootLayout';
// import '.../public/index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <ToDos/>,
                loader: toDosLoader,
                children: [
                    {path: '/create-todo', element: <NewToDo/>, action: newToDoAction},
                    {path: '/:toDoId', element: <ToDoDetails/>, loader: toDoDetailsLoader},
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);