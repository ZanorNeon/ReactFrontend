import {useState} from 'react';

function CreateModal({onClose, onCreated}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({title, description})
        })
            .then(res => {
                if (res.ok) {
                    onCreated();
                    onClose();
                } else {
                    console.error("Failed to create todo item");
                }
            })
            .catch(err => console.error("Error creating todo:", err));
    };

    return (
        <div className="modal-backdrop">
            <form onSubmit={handleSubmit} className="modal-content">
                <h2>Create New Task</h2>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{marginTop: '15px'}}>Save Todo</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateModal;