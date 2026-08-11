import ToDo from './ToDo';
import classes from './ToDosList.module.css';

function ToDosList(params) {
    const todos = params.todos;
    const onDelete = params.onDelete;

    return (
        <>
            {todos.length > 0 && (
                <ul className={classes.toDosList}>
                    {todos.map((toDo) => (
                        <ToDo key={toDo.id} id={toDo.id} text={toDo.text} onDelete={onDelete}/>
                    ))}
                </ul>
            )}
            {todos.length === 0 && (
                <div style={{textAlign: 'center', color: 'white'}}>
                    <h2>There are no To Dos yet.</h2>
                </div>
            )}
        </>
    );
}

export default ToDosList;