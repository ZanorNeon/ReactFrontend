import ToDosList from "../components/ToDosList";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function ToDosPage() {
    const [todos, setTodos] = useState([]);
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef(null);
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
    }, [reloadKey]);

    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/todos/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                }
            });
    };
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length === 0) return;

        setIsUploading(true);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        fetch('http://localhost:8080/api/files', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error("Upload failed");
                loadData();
                if (fileInputRef.current) fileInputRef.current.value = "";
            })
            .catch(err => console.error("Upload error:", err))
            .finally(() => setIsUploading(false));
    };

    const triggerFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const getFilenameFromUrl = (url) => {
        return url.substring(url.lastIndexOf('/') + 1);
    };

    return (
        <>
            <main style={{ padding: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={triggerFileSelect}
                        disabled={isUploading}
                        className="btn-upload-files"
                    >
                        {isUploading ? 'Loading' : '📎 Upload files'}
                    </button>
                </div>
                <div className="global-files-section">
                    <h3 className="global-files-title">Uploaded files:</h3>
                    {files && files.length > 0 ? (
                        <ul className="global-files-list">
                            {files.map((url, idx) => (
                                <li key={idx} className="global-file-item">
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="global-file-link"
                                    >
                                        📄 {getFilenameFromUrl(url)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="global-files-empty">There is no files yet</p>
                    )}
                </div>
                <hr style={{ border: '0', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '25px 0' }} />
                <ToDosList todos={todos} onDelete={handleDelete}/>
            </main>
        </>
    );
}

export default ToDosPage;