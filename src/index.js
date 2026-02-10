import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ToDos, { loader as ToDosLoader } from './routes/ToDos';
import NewToDo, { action as newToDoAction } from './routes/NewToDo';
import PostDetails, { loader as toDoDetailsLoader } from './routes/ToDoDetails';
import RootLayout from './routes/RootLayout';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <ToDos />,
                loader: ToDosLoader,
                children: [
                    { path: '/create-toDo', element: <NewToDo />, action: newToDoAction },
                    { path: '/:toDoId', element: <PostDetails />, loader: toDoDetailsLoader }
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);