import React from 'react';
import classes from '../routes-css/ToDoDelete.module.css'

export async function ToDoDelete({toDoId, onDeleted}) {

    const handleDelete = async () => {
        try {
            await fetch('http://localhost:8080/api/todos/' + toDoId, {
                method: 'DELETE',
            });
            if (onDeleted) {
                onDeleted();
            }
        } catch (error) {
            console.error('Failed to delete To Do:', error);
        }
    };

    return (
        <button className={classes.deleteButton} onClick={handleDelete}>
            Delete
        </button>
    );
}

export default ToDoDelete;