import { Link } from 'react-router-dom';

import classes from '../components-css/ToDo.module.css';

function ToDo({ id, text }) {
    return (
        <li className={classes.toDo}>
            <Link to={id}>
                <p className={classes.text}>{text}</p>
            </Link>
        </li>
    );
}

export default ToDo;