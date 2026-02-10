import { useLoaderData } from 'react-router-dom';

import ToDo from './ToDo';
import classes from './ToDoList.module.css';

function ToDoList() {
    const ToDo = useLoaderData();

    return (
        <>
            {ToDo.length > 0 && (
                <ul className={classes.toDo}>
                    {ToDo.map((ToDo) => (
                        <ToDo key={ToDo.id} body={ToDo.text} />
                    ))}
                </ul>
            )}
            {ToDo.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There are no posts yet.</h2>
                </div>
            )}
        </>
    );
}

export default ToDoList;