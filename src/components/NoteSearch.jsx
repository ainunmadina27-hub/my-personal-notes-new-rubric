import React from "react";

function NoteSearch({ searchKeyword, onSearch }) {
    return (
        <div className="note-search" data-testid="note-search">
            <input 
             type="text"
             placeholder="Cari catatan..."
             value={searchKeyword}
             onChange={(e) => onSearch(e.target.value)}
             data-testid="note-search-input"
             />
        </div>
    );
}

export default NoteSearch;