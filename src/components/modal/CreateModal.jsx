import {Link, useNavigate} from 'react-router-dom';
import classes from './CreateModal.module.css';

function CreateModal() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        const postData = Object.fromEntries(formData);

        await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        navigate('/');
    };

    return (
        <dialog open className={classes.modal}>
            <form className={classes.form} action={handleCreate}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name="text" required rows={2}/>
                </p>
                <p className={classes.actions}>
                    <Link to=".." type="button">
                        Cancel
                    </Link>
                    <button>Submit</button>
                </p>
            </form>
        </dialog>
    );
}

export default CreateModal;