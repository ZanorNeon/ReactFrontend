import React, { useState, useEffect } from 'react';
import { ToDoService } from '../service/api';
import { Link } from 'react-router-dom';
const ToDoList = () => {
    const [ToDos, setToDo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const response = await ToDoService.getAll();
                setToDo(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch Todos');
                setLoading(false);
                console.error(err);
            }
        };
        fetchToDos();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    return (
        <div className="container mt-4">
            <h2>Todos</h2>
            <Link to="/todo/new" className="btn btn-primary mb-3">
                Add New To Do List
            </Link>
            <div className="row">
                {ToDos.length === 0 ? (
                    <p>No Todos found</p>
                ) : (
                    ToDos.map(todo => (
                        <div className="col-md-4 mb-3" key={todo.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{todo.name}</h5>
                                    <p className="card-text">{todo.text}</p>
                                    <Link to={`/todos/${todo.id}`} className="btn btn-info mr-2">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default ToDoList;