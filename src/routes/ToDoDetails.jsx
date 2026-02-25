import {useLoaderData, Link} from 'react-router-dom';

import Modal from '../components/Modal';
import classes from '../routes-css/ToDoDetails.module.css';

function ToDoDetails() {
    const toDo = useLoaderData();

    if (!toDo) {
        return (
            <Modal>
                <main className={classes.details}>
                    <h1>Could not find the To Do</h1>
                    <p>Unfortunately, the requested To Do could not be found.</p>
                    <p>
                        <Link to=".." className={classes.buttons}>
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
                <p className={classes.text}>{toDo.body}</p>
            </main>
        </Modal>
    );
}

export default ToDoDetails;

export async function loader({params}) {
    // const response = await fetch('http://localhost:8080/api/todos/' + params.PostId);
    // const resData = await response.json();
    // return resData.post;
}