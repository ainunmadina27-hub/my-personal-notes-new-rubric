import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      showTitleWarning: false,
      bodyError: false
    };

      // TODO [Basic] kelola nilai title sebagai controlled input.
      // TODO [Basic] kelola nilai body sebagai controlled textarea.

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const value = event.target.value;
    // TODO [Basic] update state dengan nilai event.target.value.
    // TODO [Skilled] batasi judul maksimal 50 karakter dan tampilkan peringatan saat sisa karakter < 10.
  
    if (value.length <= 50) {
      this.setState({
        title: value,
        showTitleWarning: value.length >= 41 
      });
    }
  }

  onBodyChangeEventHandler(event) {
    const value = event.target.value;
    // TODO [Basic] update state body agar textarea menjadi controlled component.
    this.setState({
      body: value,
      bodyError: value.length > 0 && value.length < 10
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    // TODO [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    // TODO [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    if (this.state.body.length  < 10) {
      this.setState({bodyError: true});
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({
      title: '',
      body: '',
      showTitleWarning: false,
      bodyError: false
    });
  }

  render() {
    // TODO [Skilled] hitung sisa karakter jika menerapkan limit 50 karakter.
    const remainingChars = 50 - this.state.title.length; // update dengan nilai yang sesuai

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* // TODO [Advanced] tampilkan pesan error menggunakan elemen dengan class note-input__feedback--error. */}
        {this.state.bodyError && (
          <p className="note-input__feedback--error" data-testid="note-input-error">
            Isi catatan minimal harus 10 karakter
          </p>
        )}

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          {/* TODO [Skilled] tampilkan sisa karakter secara dinamis ketika limit judul diterapkan */}
          <p
            className={`note-input__title__char-limit
              ${this.state.showTitleWarning ? 'warning' : ''}
              ${remainingChars < 10 ? 'danger' : ''}`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className={`note-input__title ${this.state.showTitleWarning ? 'warning' : ''}`}
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            maxLength={50}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className={`note-input__body ${this.state.bodyError ? 'error' : ''}`}
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            rows="4"
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" 
          disabled={this.state.body.length < 10 || this.state.title.length === 0}
          data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
