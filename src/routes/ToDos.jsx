import { Outlet } from 'react-router-dom';

import ToDoList from "../components/ToDoList";

function ToDos() {
    return (
        <>
            <Outlet />
            <main>
                <ToDoList />
            </main>
        </>
    );
}

export default ToDos;

export async function loader() {
    const response = await fetch('http://localhost:8080/todos');
    const resData = await response.json();
    return resData.ToDos;
}