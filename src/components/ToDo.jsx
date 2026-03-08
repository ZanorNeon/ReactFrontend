import toDoClasses from './ToDo.module.css';

function ToDo({id, text, onDelete}) {

    return (
        <li className={toDoClasses.toDo}>
            <p className={toDoClasses.text}>{text}</p>
            <button className={toDoClasses.deleteButton} onClick={() => onDelete(id)}>Delete</button>
        </li>
    );
}

export default ToDo;