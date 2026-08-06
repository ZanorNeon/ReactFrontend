import ToDosList from "../components/ToDosList";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";

function ToDosPage() {
    const [todos, setTodos] = useState([]);

    const {reloadKey} = useOutletContext();

    useEffect(() => {
        fetch('http://localhost:8080/api/todos', {credentials: 'include'})
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(res => setTodos(res))
            .catch(err => console.error("Fetch error:", err));
    }, [reloadKey]);

    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/todos/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                }
            });
    };

    return (
        <>
            <main>
                <ToDosList todos={todos} onDelete={handleDelete}/>
            </main>
        </>
    );
}

export default ToDosPage;