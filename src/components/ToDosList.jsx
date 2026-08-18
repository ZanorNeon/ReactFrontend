import ToDo from './ToDo';
import classes from './ToDosList.module.css';

function ToDosList(params) {
    const todos = params.todos;
    const files = params.files;
    const onDelete = params.onDelete;
    const onUploadTrigger = params.onUploadTrigger;
    const isUploading = params.isUploading;
    const fileInputRefs = params.fileInputRefs;
    const handleFileChange = params.handleFileChange;

    return (
        <>
            {todos.length > 0 && (
                <ul className={classes.toDosList}>
                    {todos.map((toDo) => (
                        <ToDo
                            key={toDo.id}
                            id={toDo.id}
                            text={toDo.text}
                            files={files}
                            onDelete={onDelete}
                            onUploadTrigger={onUploadTrigger}
                            isUploading={isUploading}
                            fileInputRefs={fileInputRefs}
                            handleFileChange={handleFileChange}
                        />
                    ))}
                </ul>
            )}

            {todos.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There are no To Dos yet.</h2>
                </div>
            )}
        </>
    );
}

export default ToDosList;