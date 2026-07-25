import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId, searchKeyword }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = Array.isArray(notes) && notes.length > 0; // update dengan nilai yang sesuai

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          {searchKeyword ? `Tidak ada catatan dengan kata "${searchKeyword}"`
          : 'Tidak ada catatan'}
        </p>
      </div>
    );
  }

  // helper untuk grouping (Advanced)
  const groupedNotes = notes.reduce((acc, note) => {
    const date = new Date(note.createdAt);
    const key = `${date.getMonth()}-${date.getFullYear()}`;

    if (!acc[key]) acc[key] = [];
      acc[key].push(note);
      return acc;
  }, {});

  const formatGroupHeader = (key) => {
    const [month, year] = key.split('-');
    const date = new Date(year, month);

    return date.toLocaleString('id-ID', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}

      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section 
        key={groupKey} 
        data-testid={`${groupKey}-group`}
        className="notes-group"
        >
          <h3>{formatGroupHeader(groupKey)}</h3>
          <span data-testid={`${groupKey}-group-count`}>
          {groupNotes.length} catatan</span>
          {groupNotes.map((note) => (
            <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onArchive={onArchive}
            keyword={searchKeyword}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

export default NotesList;
