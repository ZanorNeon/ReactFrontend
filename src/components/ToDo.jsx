import toDoClasses from './ToDo.module.css';

function ToDo({
                  id,
                  text,
                  files = [],
                  onDelete,
                  onUploadTrigger,
                  isUploading,
                  fileInputRefs,
                  handleFileChange
              }) {

    return (
        <li className={toDoClasses.toDo}>

            <p className={toDoClasses.text}>
                {text}
            </p>

            {files && files.length > 0 && (
                <>
                    <h4 className={toDoClasses.attachmentsTitle}>
                        Attachments
                    </h4>

                    <div className={toDoClasses.files}>
                        {files.map((file) => (
                            <a
                                key={file.id}
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={toDoClasses.file}
                            >
                                📄 {file.filename}
                            </a>
                        ))}
                    </div>
                </>
            )}

            <div className={toDoClasses.buttonGroup}>

                <button
                    className={toDoClasses.deleteButton}
                    onClick={() => onDelete(id)}
                >
                    Delete
                </button>

                <input
                    type="file"
                    multiple
                    style={{display: 'none'}}
                    ref={(el) => {
                        if (fileInputRefs && fileInputRefs.current) {
                            fileInputRefs.current[id] = el;
                        }
                    }}
                    onChange={(e) => handleFileChange(e, id)}
                />

                <button
                    className={toDoClasses.uploadButton}
                    onClick={() => onUploadTrigger(id)}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>

            </div>

        </li>
    );
}

export default ToDo;