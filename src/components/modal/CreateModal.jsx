import classes from './CreateModal.module.css';

function CreateModal({onClose, onCreated}) {

    const handleCreate = async (formData) => {
        const postData = Object.fromEntries(formData);

        await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        onCreated();
        onClose();
    };

    return (
        <dialog open className={classes.modal}>
            <form className={classes.form} action={handleCreate}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name="text" required rows={2}/>
                </p>

                <p className={classes.actions}>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit">
                        Submit
                    </button>
                </p>
            </form>
        </dialog>
    );
}

export default CreateModal;