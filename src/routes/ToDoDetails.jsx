import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './ToDoDetails.module.css';

function ToDoDetails() {
    const ToDo = useLoaderData();

    if (!ToDo) {
        return (
            <Modal>
                <main className={classes.details}>
                    <h1>Could not find post</h1>
                    <p>Unfortunately, the requested post could not be found.</p>
                    <p>
                        <Link to=".." className={classes.btn}>
                            Okay
                        </Link>
                    </p>
                </main>
            </Modal>
        );
    }
    return (
        <Modal>
            <main className={classes.details}>
                <p className={classes.text}>{ToDo.body}</p>
            </main>
        </Modal>
    );
}

export default ToDoDetails;

export async function loader({params}) {
    const response = await fetch('http://localhost:8080/todos/' + params.ToDoId);
    const resData = await response.json();
    return resData.post;
}