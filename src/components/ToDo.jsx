import {Link} from 'react-router-dom';

import toDoClasses from '../components-css/ToDo.module.css';
import deleteClasses from '../routes-css/ToDoDelete.module.css';

function ToDo({id, text}) {
    return (
        <li className={toDoClasses.toDo}>
            <Link to={id}>
                <p className={toDoClasses.text}>{text}</p>
            </Link>
            <Link to={`/delete`} className={deleteClasses.deleteButton}>
                Delete
            </Link>
        </li>
    );
}

export default ToDo;