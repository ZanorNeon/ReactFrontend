import ToDosList from "../components/ToDosList";
import {useEffect, useState} from "react";

function ToDosPage() {

    const [todos, setTodos] = useState([]);

    useEffect( () => {
        fetch('http://localhost:8080/api/todos')
            .then(res => res.json())
            .then(res => setTodos(res));
    }, [])

    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/todos/' + id, {
            method: 'DELETE',
        }).then(res => {});
        setTodos(prevTodos => { prevTodos.filter(todo => todo.id !== id); });
    };

    return (
        <>
            <main>
                <ToDosList todos={todos} onDelete={handleDelete} />
            </main>
        </>
    );
}

export default ToDosPage;