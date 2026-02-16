import { Outlet } from 'react-router-dom';

import ToDosList from "../components/ToDosList";

function ToDos() {
    return (
        <>
            <Outlet />
            <main>
                <ToDosList />
            </main>
        </>
    );
}

export default ToDos;

export async function loader() {
    // const response = await fetch('http://localhost:8080/api/todos');
    // const resData = await response.json();
    // return resData.toDos;
    return []
}