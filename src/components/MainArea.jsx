import React, { useState } from "react";

function MainArea() {
    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    // function submitNote(event) {
    //     props.onAdd(note);
    //     setNote({
    //         title: "",
    //         content: ""
    //     });
    //     event.preventDefault();
    // }

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    />
                )}

                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Description"
                    rows={isExpanded ? 3 : 1}
                />
            </form>
        </div>
    );
}

export default MainArea;
