import {useLoaderData} from 'react-router-dom';

import ToDo from './ToDo';
import classes from '../components-css/ToDosList.module.css';


function ToDosList() {
    const toDos = useLoaderData() ?? [];

    return (
        <>
            {toDos.length > 0 && (
                <ul className={classes.toDosList}>
                    {toDos.map((toDo) => (
                        <ToDo key={toDo.id} text={toDo.text}/>
                    ))}
                </ul>
            )}
            {toDos.length === 0 && (
                <div style={{textAlign: 'center', color: 'white'}}>
                    <h2>There are no To Dos yet.</h2>
                </div>
            )}
        </>
    );
}

export default ToDosList;