import ToDosList from "../components/ToDosList";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function ToDosPage() {
    const [todos, setTodos] = useState([]);
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRefs = useRef({});
    const { reloadKey } = useOutletContext();

    const loadData = () => {
        Promise.all([
            fetch('http://localhost:8080/api/todos', { credentials: 'include' }),
            fetch('http://localhost:8080/api/files', { credentials: 'include' })
        ])
            .then(([todosRes, filesRes]) => {
                if (!todosRes.ok || !filesRes.ok) throw new Error("Unauthorized or server error");
                return Promise.all([todosRes.json(), filesRes.json()]);
            })
            .then(([todosData, filesData]) => {
                setTodos(todosData);
                setFiles(filesData);
            })
            .catch(err => console.error("Fetch error:", err));
    };

    useEffect(() => {
        loadData();
        const intervalId = setInterval(() => {
            fetch('http://localhost:8080/api/files', { credentials: 'include' })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error("Failed to fetch files");
                })
                .then(filesData => {
                    setFiles(filesData);
                })
                .catch(err => console.error("Polling files error:", err));
        }, 3000);
        return () => clearInterval(intervalId);
    }, [reloadKey]);

    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/todos/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                    setFiles(prevFiles => prevFiles.filter(file => file.todoId !== id));
                }
            });
    };

    const handleFileChange = (event, todoId) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length === 0) return;

        setIsUploading(true);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        formData.append('todoId', todoId);

        fetch('http://localhost:8080/api/files', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error("Upload failed");
                loadData();
                if (fileInputRefs.current[todoId]) {
                    fileInputRefs.current[todoId].value = "";
                }
            })
            .catch(err => console.error("Upload error:", err))
            .finally(() => setIsUploading(false));
    };

    const triggerFileSelect = (todoId) => {
        if (fileInputRefs.current[todoId]) {
            fileInputRefs.current[todoId].click();
        }
    };

    return (
        <main className="todos-page-main">
            <ToDosList
                todos={todos}
                files={files}
                onDelete={handleDelete}
                onUploadTrigger={triggerFileSelect}
                isUploading={isUploading}
                fileInputRefs={fileInputRefs}
                handleFileChange={handleFileChange}
            />
        </main>
    );
}

export default ToDosPage;