import React from "react";

function NoteActionButton({ variant, onClick, children, ...props }) {
    return (
        <button 
         className={`note-item__${variant}-button`}
         onClick={onClick} {...props}
        >
            {children}
        </button>
    );
}

export default NoteActionButton;